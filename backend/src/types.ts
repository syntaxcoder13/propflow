export interface PropertyListing {
  id: string;
  title: string;
  price: string;               // e.g. "₹85 L" or "₹1.4 Cr"
  numericPrice: number;        // Clean parsed number (e.g. 8500000)
  currency: string;            // "INR"
  bhk: string;                 // e.g. "2 BHK"
  carpetAreaSqFt: number;      // e.g. 720
  location: {
    locality: string;          // e.g. "Dombivli East", "Bandra West", "Wakad"
    city: string;              // "Mumbai", "Thane", "Pune"
    state: string;             // "Maharashtra"
  };
  features: string[];          // e.g. ["Ready to Move", "Balcony", "Covered Parking"]
  imageUrl: string;
  sourceUrl: string;
  scrapedAt: string;
}

export * from "./services/scraper/types";
