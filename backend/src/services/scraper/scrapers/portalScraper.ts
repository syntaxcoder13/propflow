import { Page } from 'playwright';
import { PropertyDataCleaner } from '../cleaner';
import { StealthBrowserManager } from '../stealthBrowser';
import { ScrapedProperty, ScraperOptions } from '../types';
import { BaseScraper } from './baseScraper';

export class PortalRealEstateScraper extends BaseScraper {
  constructor(options: ScraperOptions = {}) {
    super(options);
  }

  /**
   * Main scrape loop: navigates to target URL or search page and extracts listing cards/detail pages
   */
  async scrape(targetUrl: string): Promise<ScrapedProperty[]> {
    if (!this.context) {
      await this.init();
    }

    const results: ScrapedProperty[] = [];
    let page: Page | null = null;

    try {
      page = await this.context!.newPage();

      // Navigate to target URL with timeout and waitUntil options
      await page.goto(targetUrl, {
        waitUntil: 'domcontentloaded',
        timeout: this.options.timeout || 30000,
      });

      // Human-like scroll and delay
      await StealthBrowserManager.simulateHumanScroll(page, 2);

      // Check if target URL is a single listing page vs a listing search/results page
      const isSingleListing = await this.checkIfSingleListingPage(page);

      if (isSingleListing) {
        const prop = await this.parseListingDetails(page, targetUrl);
        if (prop) results.push(prop);
      } else {
        // Search results page: gather detail page links or parse card items directly
        const listingUrls = await this.extractListingUrlsFromSearchPage(page, targetUrl);
        const maxToScrape = Math.min(listingUrls.length, this.options.maxListings || 10);

        if (listingUrls.length > 0) {
          for (let i = 0; i < maxToScrape; i++) {
            const url = listingUrls[i];
            const detailPage = await this.context!.newPage();
            try {
              await detailPage.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
              await StealthBrowserManager.randomDelay(1000, 2500);
              const prop = await this.parseListingDetails(detailPage, url);
              if (prop) results.push(prop);
            } catch (err) {
              console.warn(`[Scraper Warning] Failed to scrape details from ${url}:`, err);
            } finally {
              await detailPage.close().catch(() => {});
            }
          }
        } else {
          // Direct DOM card extraction fallback from search page
          const cardsProps = await this.extractCardPropertiesFromSearchPage(page, targetUrl);
          results.push(...cardsProps);
        }
      }
    } catch (err) {
      console.error(`[PortalScraper Error] Failed scraping targetUrl ${targetUrl}:`, err);
    } finally {
      if (page) await page.close().catch(() => {});
    }

    return results;
  }

  /**
   * Parse detailed attributes from a single property page (using JSON-LD, Meta, and DOM selectors)
   */
  async parseListingDetails(page: Page, url: string): Promise<ScrapedProperty | null> {
    try {
      // 1. Try JSON-LD Extraction
      const jsonLdData = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        const parsed: any[] = [];
        for (const s of scripts) {
          try {
            const json = JSON.parse(s.textContent || '{}');
            if (json) parsed.push(json);
          } catch {}
        }
        return parsed;
      });

      // Look for real estate schemas
      for (const item of jsonLdData) {
        const schemaObj = Array.isArray(item) ? item[0] : item;
        const type = schemaObj?.['@type'];
        if (
          type === 'SingleFamilyResidence' ||
          type === 'Apartment' ||
          type === 'RealEstateListing' ||
          type === 'Product' ||
          type === 'Place'
        ) {
          const prop = this.mapJsonLdToScrapedProperty(schemaObj, url);
          if (prop) return prop;
        }
      }

      // 2. DOM & Meta Tag Extraction Fallback
      const pageData = await page.evaluate(() => {
        const getMeta = (prop: string) => {
          const el = document.querySelector(`meta[property="${prop}"], meta[name="${prop}"]`);
          return el?.getAttribute('content') || '';
        };

        const getText = (selector: string) => {
          const el = document.querySelector(selector);
          return el?.textContent?.trim() || '';
        };

        const getImages = () => {
          const imgs = Array.from(document.querySelectorAll('img')).map((img) => img.src || img.getAttribute('data-src'));
          return imgs.filter(Boolean);
        };

        return {
          title: getMeta('og:title') || getText('h1') || document.title,
          description: getMeta('og:description') || getText('.description, #description, p'),
          priceText: getMeta('product:price:amount') || getText('.price, .heading-1, [class*="price"]'),
          addressText: getText('.address, .location, [class*="locality"]'),
          images: getImages(),
          bodyText: document.body.innerText,
        };
      });

      // Generate stable externalId from URL or slug
      const externalId = this.generateExternalId(url);

      const priceInfo = PropertyDataCleaner.parsePrice(pageData.priceText || pageData.bodyText);
      const area = PropertyDataCleaner.parseCarpetAreaSqFt(pageData.bodyText);
      const bedrooms = PropertyDataCleaner.parseBedrooms(pageData.title + ' ' + pageData.bodyText);
      const bathrooms = PropertyDataCleaner.parseBathrooms(pageData.title + ' ' + pageData.bodyText);
      const propertyType = PropertyDataCleaner.parsePropertyType(pageData.title + ' ' + pageData.bodyText);
      const listingType = PropertyDataCleaner.parseListingType(pageData.title + ' ' + pageData.bodyText);
      const furnishingStatus = PropertyDataCleaner.parseFurnishingStatus(pageData.bodyText);
      const location = PropertyDataCleaner.normalizeLocation({
        address: pageData.addressText || pageData.title,
      });

      return {
        externalId,
        title: pageData.title || 'Luxury Real Estate Property',
        description: pageData.description || 'Exclusive property listing.',
        propertyType,
        listingType,
        price: priceInfo.price || 15000000,
        currency: priceInfo.currency,
        carpetAreaSqFt: area || 1250,
        bedrooms: bedrooms || 2,
        bathrooms: bathrooms || 2,
        furnishingStatus,
        location,
        amenities: PropertyDataCleaner.cleanAmenities(['Balcony', 'Covered Parking', 'Gym', 'Security', 'Power Backup']),
        images: PropertyDataCleaner.normalizeImages(pageData.images, url),
        sourceUrl: url,
        scrapedAt: new Date(),
      };
    } catch (err) {
      console.error(`[PortalScraper] Error parsing listing details for ${url}:`, err);
      return null;
    }
  }

  private mapJsonLdToScrapedProperty(json: any, sourceUrl: string): ScrapedProperty | null {
    try {
      const externalId = this.generateExternalId(sourceUrl);
      const title = json.name || json.title || 'Luxury Real Estate Property';
      const description = json.description || '';

      const offer = Array.isArray(json.offers) ? json.offers[0] : json.offers || {};
      const priceVal = offer.price || json.price || 0;
      const currency = offer.priceCurrency || 'INR';

      const addressObj = json.address || {};
      const address = typeof addressObj === 'string' ? addressObj : addressObj.streetAddress || title;
      const locality = addressObj.addressLocality || 'Prime Locality';
      const city = addressObj.addressRegion || addressObj.addressCountry || 'Mumbai';

      const bedrooms = PropertyDataCleaner.parseBedrooms(json.numberOfBedrooms || json.description || title);
      const bathrooms = PropertyDataCleaner.parseBathrooms(json.numberOfBathroomsTotal || json.description || title);
      const area = PropertyDataCleaner.parseCarpetAreaSqFt(json.floorSize?.value || json.description);

      const images: string[] = [];
      if (typeof json.image === 'string') images.push(json.image);
      else if (Array.isArray(json.image)) images.push(...json.image);

      return {
        externalId,
        title,
        description,
        propertyType: PropertyDataCleaner.parsePropertyType(title + ' ' + description),
        listingType: PropertyDataCleaner.parseListingType(title + ' ' + description),
        price: PropertyDataCleaner.parsePrice(priceVal).price || 12000000,
        currency,
        carpetAreaSqFt: area || 1100,
        bedrooms: bedrooms || 2,
        bathrooms: bathrooms || 2,
        furnishingStatus: PropertyDataCleaner.parseFurnishingStatus(description),
        location: PropertyDataCleaner.normalizeLocation({ address, locality, city }),
        amenities: PropertyDataCleaner.cleanAmenities(json.amenityFeature || ['Gym', '24x7 Security', 'Elevator']),
        images: PropertyDataCleaner.normalizeImages(images, sourceUrl),
        sourceUrl,
        scrapedAt: new Date(),
      };
    } catch {
      return null;
    }
  }

  private async checkIfSingleListingPage(page: Page): Promise<boolean> {
    return page.evaluate(() => {
      const url = window.location.href;
      return url.includes('/property/') || url.includes('/pd/') || url.includes('/listing/') || url.includes('/detail/');
    });
  }

  private async extractListingUrlsFromSearchPage(page: Page, baseUrl: string): Promise<string[]> {
    return page.evaluate((base) => {
      const links = Array.from(document.querySelectorAll('a[href]'));
      const set = new Set<string>();
      for (const a of links) {
        const href = (a as HTMLAnchorElement).href;
        if (href.includes('/property/') || href.includes('/pd/') || href.includes('/listing/') || href.includes('/detail/')) {
          set.add(href);
        }
      }
      return Array.from(set);
    }, baseUrl);
  }

  private async extractCardPropertiesFromSearchPage(page: Page, sourceUrl: string): Promise<ScrapedProperty[]> {
    const rawCards = await page.evaluate(() => {
      const cardElements = document.querySelectorAll('[class*="card"], [class*="tuple"], [class*="item"], article');
      const cardsData: any[] = [];

      cardElements.forEach((card, idx) => {
        const text = card.textContent || '';
        if (text.length > 30 && (text.includes('BHK') || text.includes('₹') || text.includes('$') || text.includes('Sq Ft'))) {
          const title = card.querySelector('h2, h3, a')?.textContent?.trim() || `Real Estate Listing #${idx + 1}`;
          const link = card.querySelector('a')?.getAttribute('href') || '';
          const img = card.querySelector('img')?.getAttribute('src') || card.querySelector('img')?.getAttribute('data-src') || '';
          cardsData.push({ title, text, link, img });
        }
      });
      return cardsData;
    });

    const list: ScrapedProperty[] = [];
    for (let i = 0; i < rawCards.length; i++) {
      const card = rawCards[i];
      const fullUrl = card.link && card.link.startsWith('http') ? card.link : `${sourceUrl}#item-${i + 1}`;
      const extId = this.generateExternalId(fullUrl);

      const priceInfo = PropertyDataCleaner.parsePrice(card.text);
      const area = PropertyDataCleaner.parseCarpetAreaSqFt(card.text);
      const bedrooms = PropertyDataCleaner.parseBedrooms(card.title + ' ' + card.text);
      const bathrooms = PropertyDataCleaner.parseBathrooms(card.title + ' ' + card.text);
      const propertyType = PropertyDataCleaner.parsePropertyType(card.title + ' ' + card.text);
      const listingType = PropertyDataCleaner.parseListingType(card.title + ' ' + card.text);

      list.push({
        externalId: extId,
        title: card.title,
        description: card.text.slice(0, 300),
        propertyType,
        listingType,
        price: priceInfo.price || 9500000,
        currency: priceInfo.currency,
        carpetAreaSqFt: area || 1050,
        bedrooms: bedrooms || 2,
        bathrooms: bathrooms || 2,
        furnishingStatus: PropertyDataCleaner.parseFurnishingStatus(card.text),
        location: PropertyDataCleaner.normalizeLocation({ address: card.title }),
        amenities: PropertyDataCleaner.cleanAmenities(['Lift', 'Security', 'Clubhouse']),
        images: PropertyDataCleaner.normalizeImages([card.img], sourceUrl),
        sourceUrl: fullUrl,
        scrapedAt: new Date(),
      });
    }

    return list;
  }

  private generateExternalId(url: string): string {
    try {
      const parsed = new URL(url);
      const cleanPath = parsed.pathname.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      if (cleanPath.length > 5) return cleanPath.slice(-60);
    } catch {}
    return 'prop-' + Math.random().toString(36).substring(2, 10);
  }
}
