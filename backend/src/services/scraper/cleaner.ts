import { FurnishingStatus, ListingType, PropertyLocation, PropertyType } from './types';

/**
 * Normalization & Cleaning Utilities for Real Estate Data
 */
export class PropertyDataCleaner {
  /**
   * Parse price from strings like "₹ 1.25 Cr", "₹ 85 Lacs", "$1.5 M", "₹ 45,000 / month"
   */
  static parsePrice(rawInput: string | number | undefined | null): { price: number; currency: string } {
    if (rawInput === undefined || rawInput === null || rawInput === '') {
      return { price: 0, currency: 'INR' };
    }

    if (typeof rawInput === 'number') {
      return { price: Math.max(0, rawInput), currency: 'INR' };
    }

    const str = rawInput.trim().toUpperCase();

    // Detect currency
    let currency = 'INR';
    if (str.includes('$') || str.includes('USD')) {
      currency = 'USD';
    } else if (str.includes('€') || str.includes('EUR')) {
      currency = 'EUR';
    } else if (str.includes('£') || str.includes('GBP')) {
      currency = 'GBP';
    } else if (str.includes('₹') || str.includes('INR') || str.includes('RS') || str.includes('RUPEES')) {
      currency = 'INR';
    }

    // Clean numerical string
    const cleanStr = str.replace(/[^0-9.\sKMLCR]/g, '');

    // Check for Indian Crore (Cr / Crore / Crores) -> 1 Cr = 10,000,000
    const croreMatch = str.match(/([\d.]+)\s*(CR|CRORE|CRORES)/i);
    if (croreMatch) {
      const val = parseFloat(croreMatch[1]);
      if (!isNaN(val)) {
        return { price: Math.round(val * 10_000_000), currency };
      }
    }

    // Check for Indian Lakh (Lac / Lakh / Lacs / Lakhs) -> 1 Lac = 100,000
    const lakhMatch = str.match(/([\d.]+)\s*(LAC|LAKH|LACS|LAKHS)/i);
    if (lakhMatch) {
      const val = parseFloat(lakhMatch[1]);
      if (!isNaN(val)) {
        return { price: Math.round(val * 100_000), currency };
      }
    }

    // Check for Million (M / Million) -> 1M = 1,000,000
    const millionMatch = str.match(/([\d.]+)\s*(M|MILLION)/i);
    if (millionMatch) {
      const val = parseFloat(millionMatch[1]);
      if (!isNaN(val)) {
        return { price: Math.round(val * 1_000_000), currency };
      }
    }

    // Check for Thousand (K / Thousand) -> 1K = 1,000
    const thousandMatch = str.match(/([\d.]+)\s*(K|THOUSAND)/i);
    if (thousandMatch) {
      const val = parseFloat(thousandMatch[1]);
      if (!isNaN(val)) {
        return { price: Math.round(val * 1_000), currency };
      }
    }

    // Pure digits parsing
    const numericOnly = str.replace(/[^0-9.]/g, '');
    const fallbackVal = parseFloat(numericOnly);
    return {
      price: isNaN(fallbackVal) ? 0 : Math.round(fallbackVal),
      currency,
    };
  }

  /**
   * Parse carpet area to pure SqFt integer/float
   */
  static parseCarpetAreaSqFt(rawInput: string | number | undefined | null): number {
    if (rawInput === undefined || rawInput === null || rawInput === '') return 0;
    if (typeof rawInput === 'number') return Math.max(0, rawInput);

    const str = rawInput.trim().toUpperCase();

    // Sq Yd (Square Yards) -> 1 Sq Yd = 9 Sq Ft
    const sqYdMatch = str.match(/([\d,.]+)\s*(SQ\.?\s*YD|SQYDS?|YARDS?)/i);
    if (sqYdMatch) {
      const val = parseFloat(sqYdMatch[1].replace(/,/g, ''));
      if (!isNaN(val)) return Math.round(val * 9);
    }

    // Sq Meters -> 1 Sq Meter = 10.7639 Sq Ft
    const sqMtrMatch = str.match(/([\d,.]+)\s*(SQ\.?\s*M|SQMTR?|METERS?)/i);
    if (sqMtrMatch) {
      const val = parseFloat(sqMtrMatch[1].replace(/,/g, ''));
      if (!isNaN(val)) return Math.round(val * 10.7639);
    }

    // Acres -> 1 Acre = 43,560 Sq Ft
    const acreMatch = str.match(/([\d,.]+)\s*(ACRES?)/i);
    if (acreMatch) {
      const val = parseFloat(acreMatch[1].replace(/,/g, ''));
      if (!isNaN(val)) return Math.round(val * 43560);
    }

    // Standard Sq Ft extraction
    const numericOnly = str.replace(/[^0-9.]/g, '');
    const val = parseFloat(numericOnly);
    return isNaN(val) ? 0 : Math.round(val);
  }

  /**
   * Extract numeric bedrooms count from strings like "3 BHK", "2 Bedroom", "Studio"
   */
  static parseBedrooms(rawInput: string | number | undefined | null): number {
    if (typeof rawInput === 'number') return Math.max(0, rawInput);
    if (!rawInput) return 0;

    const str = rawInput.trim().toUpperCase();

    if (str.includes('STUDIO') || str.includes('1 RK')) return 1;

    const bhkMatch = str.match(/(\d+)\s*(BHK|BED|BEDROOM|BEDROOMS)/i);
    if (bhkMatch) {
      const count = parseInt(bhkMatch[1], 10);
      if (!isNaN(count)) return count;
    }

    const firstDigit = str.match(/\d+/);
    if (firstDigit) {
      const count = parseInt(firstDigit[0], 10);
      if (!isNaN(count) && count <= 20) return count;
    }

    return 0;
  }

  /**
   * Extract numeric bathrooms count
   */
  static parseBathrooms(rawInput: string | number | undefined | null): number {
    if (typeof rawInput === 'number') return Math.max(0, rawInput);
    if (!rawInput) return 0;

    const str = rawInput.trim().toUpperCase();

    const bathMatch = str.match(/(\d+)\s*(BATH|BATHROOM|BATHROOMS|TOILET|T)/i);
    if (bathMatch) {
      const count = parseInt(bathMatch[1], 10);
      if (!isNaN(count)) return count;
    }

    const firstDigit = str.match(/\d+/);
    if (firstDigit) {
      const count = parseInt(firstDigit[0], 10);
      if (!isNaN(count) && count <= 20) return count;
    }

    return 0;
  }

  /**
   * Parse property type string to exact enum union
   */
  static parsePropertyType(rawInput: string | undefined | null): PropertyType {
    if (!rawInput) return 'APARTMENT';
    const str = rawInput.trim().toUpperCase();

    if (str.includes('VILLA') || str.includes('BUNGALOW') || str.includes('INDEPENDENT HOUSE') || str.includes('ROW HOUSE')) {
      return 'VILLA';
    }
    if (str.includes('PENTHOUSE')) {
      return 'PENTHOUSE';
    }
    if (str.includes('PLOT') || str.includes('LAND') || str.includes('AGRICULTURAL')) {
      return 'PLOT';
    }
    if (str.includes('COMMERCIAL') || str.includes('OFFICE') || str.includes('SHOP') || str.includes('RETAIL') || str.includes('WAREHOUSE')) {
      return 'COMMERCIAL';
    }

    return 'APARTMENT';
  }

  /**
   * Parse listing type (SALE vs RENT)
   */
  static parseListingType(rawInput: string | undefined | null): ListingType {
    if (!rawInput) return 'SALE';
    const str = rawInput.trim().toUpperCase();

    if (str.includes('RENT') || str.includes('LEASE') || str.includes('PG') || str.includes('/MONTH') || str.includes('PER MONTH')) {
      return 'RENT';
    }
    return 'SALE';
  }

  /**
   * Parse furnishing status
   */
  static parseFurnishingStatus(rawInput: string | undefined | null): FurnishingStatus | undefined {
    if (!rawInput) return undefined;
    const str = rawInput.trim().toUpperCase();

    if (str.includes('SEMI') || str.includes('PARTIAL')) {
      return 'SEMI_FURNISHED';
    }
    if (str.includes('UNFURNISHED') || str.includes('BARE') || str.includes('SHELL')) {
      return 'UNFURNISHED';
    }
    if (str.includes('FURNISHED') || str.includes('FULLY')) {
      return 'FURNISHED';
    }
    return undefined;
  }

  /**
   * Clean and normalize amenities list
   */
  static cleanAmenities(rawInput: string[] | string | undefined | null): string[] {
    if (!rawInput) return [];

    let items: string[] = [];
    if (Array.isArray(rawInput)) {
      items = rawInput;
    } else if (typeof rawInput === 'string') {
      items = rawInput.split(/[,;\n|]/);
    }

    const uniqueMap = new Map<string, string>();
    for (const item of items) {
      const trimmed = item.trim().replace(/^[^a-zA-Z0-9]+/, '');
      if (trimmed.length >= 2 && trimmed.length <= 60) {
        // Title Case capitalization
        const normalized = trimmed
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase());
        if (!uniqueMap.has(normalized.toLowerCase())) {
          uniqueMap.set(normalized.toLowerCase(), normalized);
        }
      }
    }

    return Array.from(uniqueMap.values());
  }

  /**
   * Clean & normalize image URLs to absolute HTTP/HTTPS URLs
   */
  static normalizeImages(rawUrls: (string | undefined | null)[], baseUrl?: string): string[] {
    const validUrls = new Set<string>();

    for (const url of rawUrls) {
      if (!url || typeof url !== 'string') continue;
      let cleanUrl = url.trim();

      // Skip tiny placeholders or data URLs
      if (cleanUrl.startsWith('data:') || cleanUrl.includes('placeholder') || cleanUrl.length < 10) {
        continue;
      }

      // Handle relative URLs
      if (cleanUrl.startsWith('//')) {
        cleanUrl = 'https:' + cleanUrl;
      } else if (cleanUrl.startsWith('/') && baseUrl) {
        try {
          const origin = new URL(baseUrl).origin;
          cleanUrl = origin + cleanUrl;
        } catch {
          // fallback
        }
      }

      if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
        validUrls.add(cleanUrl);
      }
    }

    return Array.from(validUrls);
  }

  /**
   * Normalize location details
   */
  static normalizeLocation(raw: {
    address?: string;
    locality?: string;
    city?: string;
    latitude?: number | string;
    longitude?: number | string;
  }): PropertyLocation {
    const city = (raw.city || 'Mumbai').trim();
    const locality = (raw.locality || raw.address || 'Central').trim();
    const address = (raw.address || `${locality}, ${city}`).trim();

    let latitude: number | undefined;
    let longitude: number | undefined;

    if (raw.latitude !== undefined && raw.latitude !== null) {
      const lat = typeof raw.latitude === 'number' ? raw.latitude : parseFloat(raw.latitude);
      if (!isNaN(lat) && lat >= -90 && lat <= 90) latitude = lat;
    }

    if (raw.longitude !== undefined && raw.longitude !== null) {
      const lng = typeof raw.longitude === 'number' ? raw.longitude : parseFloat(raw.longitude);
      if (!isNaN(lng) && lng >= -180 && lng <= 180) longitude = lng;
    }

    return {
      address,
      locality,
      city,
      latitude,
      longitude,
    };
  }
}
