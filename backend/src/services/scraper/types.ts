export type PropertyType = 'APARTMENT' | 'VILLA' | 'PENTHOUSE' | 'PLOT' | 'COMMERCIAL';
export type ListingType = 'SALE' | 'RENT';
export type FurnishingStatus = 'UNFURNISHED' | 'SEMI_FURNISHED' | 'FURNISHED';

export interface PropertyLocation {
  address: string;
  locality: string;           // e.g. "Dombivli East"
  city: string;               // e.g. "Mumbai"
  latitude?: number;
  longitude?: number;
}

export interface ScrapedProperty {
  externalId: string;           // Unique ID or slug from source
  title: string;                // e.g. "2 BHK Luxury Apartment"
  description?: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;                // Clean numerical value in standard currency unit
  currency: string;             // e.g. "INR" or "USD"
  carpetAreaSqFt: number;       // Parsed to pure integer/float
  bedrooms: number;             // e.g. 2, 3
  bathrooms: number;            // e.g. 2
  furnishingStatus?: FurnishingStatus;
  location: PropertyLocation;
  amenities: string[];          // e.g. ["Gym", "Balcony", "Covered Parking"]
  images: string[];             // Array of absolute image URLs
  sourceUrl: string;            // Original canonical listing URL
  scrapedAt: Date;
}

export interface ScraperOptions {
  headless?: boolean;
  slowMo?: number;
  timeout?: number;
  maxListings?: number;
  proxy?: string;
  saveToDb?: boolean;
}

export interface ScrapeResult {
  success: boolean;
  portalName: string;
  totalFound: number;
  properties: ScrapedProperty[];
  savedToDbCount: number;
  errors: string[];
  durationMs: number;
}
