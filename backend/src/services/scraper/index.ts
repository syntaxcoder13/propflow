import { PropertyDataCleaner } from './cleaner';
import { PropertyDatabaseService } from './dbService';
import { BaseScraper } from './scrapers/baseScraper';
import { PortalRealEstateScraper } from './scrapers/portalScraper';
import { StealthBrowserManager } from './stealthBrowser';
import { ScrapedProperty, ScraperOptions, ScrapeResult } from './types';

export * from './cleaner';
export * from './dbService';
export * from './scrapers/baseScraper';
export * from './scrapers/portalScraper';
export * from './stealthBrowser';
export * from './types';

export class PropFlowScraperService {
  /**
   * Run full end-to-end real estate scraping job:
   * 1. Launches Playwright with stealth evasions
   * 2. Scrapes target real estate portal URL
   * 3. Cleans and normalizes properties into `ScrapedProperty` interface
   * 4. Upserts records into database without duplicate entries
   */
  static async runScrapeJob(targetUrl: string, options: ScraperOptions = {}): Promise<ScrapeResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    let properties: ScrapedProperty[] = [];
    let savedToDbCount = 0;

    const scraper: BaseScraper = new PortalRealEstateScraper(options);

    try {
      console.log(`[PropFlow Scraper] Starting job for URL: ${targetUrl}`);
      await scraper.init();
      properties = await scraper.scrape(targetUrl);

      console.log(`[PropFlow Scraper] Extracted ${properties.length} listings from portal.`);

      // Clean and normalize each listing guaranteed against ScrapedProperty contract
      properties = properties.map((prop) => PropFlowScraperService.normalizeListing(prop));

      if (options.saveToDb !== false && properties.length > 0) {
        console.log(`[PropFlow Scraper] Upserting properties to database...`);
        const dbResult = await PropertyDatabaseService.bulkUpsertScrapedProperties(properties);
        savedToDbCount = dbResult.saved;
        if (dbResult.errors.length > 0) {
          errors.push(...dbResult.errors);
        }
        console.log(`[PropFlow Scraper] Successfully upserted ${savedToDbCount} listings (${dbResult.newCount} new, ${dbResult.updatedCount} updated).`);
      }
    } catch (err: any) {
      const errMsg = `[PropFlow Scraper Error] ${err.message || err}`;
      console.error(errMsg);
      errors.push(errMsg);
    } finally {
      await scraper.close().catch(() => {});
    }

    const durationMs = Date.now() - startTime;
    return {
      success: errors.length === 0,
      portalName: targetUrl,
      totalFound: properties.length,
      properties,
      savedToDbCount,
      errors,
      durationMs,
    };
  }

  /**
   * Normalize listing guaranteed to conform to exact `ScrapedProperty` interface
   */
  public static normalizeListing(raw: Partial<ScrapedProperty> & { sourceUrl: string }): ScrapedProperty {
    const priceInfo = PropertyDataCleaner.parsePrice(raw.price);

    return {
      externalId: raw.externalId || `ext-${Math.random().toString(36).substring(2, 10)}`,
      title: raw.title ? raw.title.trim() : 'Luxury Real Estate Property',
      description: raw.description ? raw.description.trim() : '',
      propertyType: PropertyDataCleaner.parsePropertyType(raw.propertyType || raw.title),
      listingType: PropertyDataCleaner.parseListingType(raw.listingType || raw.title),
      price: priceInfo.price || 10000000,
      currency: raw.currency || priceInfo.currency || 'INR',
      carpetAreaSqFt: PropertyDataCleaner.parseCarpetAreaSqFt(raw.carpetAreaSqFt),
      bedrooms: PropertyDataCleaner.parseBedrooms(raw.bedrooms),
      bathrooms: PropertyDataCleaner.parseBathrooms(raw.bathrooms),
      furnishingStatus: PropertyDataCleaner.parseFurnishingStatus(raw.furnishingStatus),
      location: PropertyDataCleaner.normalizeLocation(raw.location || { address: raw.title || '' }),
      amenities: PropertyDataCleaner.cleanAmenities(raw.amenities),
      images: PropertyDataCleaner.normalizeImages(raw.images || [], raw.sourceUrl),
      sourceUrl: raw.sourceUrl,
      scrapedAt: raw.scrapedAt || new Date(),
    };
  }

  /**
   * Helper to generate sample mock properties for test runs or demo feeds
   */
  static generateMockScrapedProperties(): ScrapedProperty[] {
    return [
      {
        externalId: '99a-mumbai-2bhk-dombivli-001',
        title: '2 BHK Luxury Apartment in Dombivli East',
        description: 'Spacious 2 BHK home with modern amenities, modular kitchen, and panoramic balcony view in prime location.',
        propertyType: 'APARTMENT',
        listingType: 'SALE',
        price: 6500000,
        currency: 'INR',
        carpetAreaSqFt: 780,
        bedrooms: 2,
        bathrooms: 2,
        furnishingStatus: 'SEMI_FURNISHED',
        location: {
          address: 'Palava City, Dombivli East, Thane',
          locality: 'Dombivli East',
          city: 'Mumbai',
          latitude: 19.2183,
          longitude: 73.0869,
        },
        amenities: ['Gym', 'Swimming Pool', 'Clubhouse', 'Balcony', 'Covered Parking', '24x7 Security'],
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        ],
        sourceUrl: 'https://www.99acres.com/2-bhk-bedroom-apartment-flat-for-sale-in-dombivli-east-mumbai-780-sq-ft-spid-P101',
        scrapedAt: new Date(),
      },
      {
        externalId: 'housing-mumbai-3bhk-powai-002',
        title: '3 BHK High-Rise Penthouse with Lake View',
        description: 'Ultra luxury penthouse overlooking Powai Lake. Includes private terrace, Jacuzzi, and Italian marble flooring.',
        propertyType: 'PENTHOUSE',
        listingType: 'SALE',
        price: 32000000,
        currency: 'INR',
        carpetAreaSqFt: 1850,
        bedrooms: 3,
        bathrooms: 3,
        furnishingStatus: 'FURNISHED',
        location: {
          address: 'Hiranandani Gardens, Powai',
          locality: 'Powai',
          city: 'Mumbai',
          latitude: 19.1197,
          longitude: 72.905,
        },
        amenities: ['Private Terrace', 'Jacuzzi', 'Gym', 'High Speed Elevators', 'Concierge Service'],
        images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        ],
        sourceUrl: 'https://housing.com/in/buy/resale/page/3-bhk-penthouse-in-powai-mumbai-1850-sq-ft',
        scrapedAt: new Date(),
      },
      {
        externalId: 'realtor-ny-commercial-003',
        title: 'Prime Commercial Office Space in Financial District',
        description: 'Grade-A commercial office space fully fitted with conference rooms, executive suites, and high-speed fiber internet.',
        propertyType: 'COMMERCIAL',
        listingType: 'RENT',
        price: 8500,
        currency: 'USD',
        carpetAreaSqFt: 2400,
        bedrooms: 0,
        bathrooms: 2,
        furnishingStatus: 'FURNISHED',
        location: {
          address: '100 Wall Street',
          locality: 'Financial District',
          city: 'New York',
          latitude: 40.7058,
          longitude: -74.0084,
        },
        amenities: ['24/7 Access', 'Conference Room', 'Fiber Internet', 'HVAC', 'Valet Parking'],
        images: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        ],
        sourceUrl: 'https://www.realtor.com/realestateandhomes-detail/100-Wall-St-New-York-NY-10005',
        scrapedAt: new Date(),
      },
    ];
  }
}
