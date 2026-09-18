import { PropertyListing } from "../src/types";
export declare function parseIndianPrice(priceStr: string): {
    priceText: string;
    numericPrice: number;
};
export declare function parseAreaSqFt(areaStr: string): number;
export declare function runMaharashtraScraper(): Promise<PropertyListing[]>;
