import { PropertyDataCleaner } from '../cleaner';
import { PropertyDatabaseService } from '../dbService';
import { PropFlowScraperService } from '../index';
import { ScrapedProperty } from '../types';

function assertEqual(actual: any, expected: any, message: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`[Assertion Fail] ${message} | Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(actual)}`);
  }
  console.log(`  ✓ ${message}`);
}

async function runTests() {
  console.log('🧪 Running PropFlow Real Estate Scraper Unit & Integration Tests...\n');

  // --- Test 1: Price Parsing ---
  console.log('--- Test Suite 1: Currency & Price Parsing ---');
  assertEqual(PropertyDataCleaner.parsePrice('₹ 1.25 Cr'), { price: 12500000, currency: 'INR' }, 'Parse 1.25 Cr to 12,500,000 INR');
  assertEqual(PropertyDataCleaner.parsePrice('₹ 85 Lacs'), { price: 8500000, currency: 'INR' }, 'Parse 85 Lacs to 8,500,000 INR');
  assertEqual(PropertyDataCleaner.parsePrice('$1.5M'), { price: 1500000, currency: 'USD' }, 'Parse $1.5M to 1,500,000 USD');
  assertEqual(PropertyDataCleaner.parsePrice('₹ 45,000 / month'), { price: 45000, currency: 'INR' }, 'Parse rental price 45,000 INR');

  // --- Test 2: Carpet Area Parsing ---
  console.log('\n--- Test Suite 2: Carpet Area SqFt Normalization ---');
  assertEqual(PropertyDataCleaner.parseCarpetAreaSqFt('780 Sq Ft'), 780, 'Parse 780 Sq Ft');
  assertEqual(PropertyDataCleaner.parseCarpetAreaSqFt('100 Sq Yds'), 900, 'Convert 100 Sq Yds to 900 Sq Ft');
  assertEqual(PropertyDataCleaner.parseCarpetAreaSqFt('100 Sq Mtr'), 1076, 'Convert 100 Sq Mtr to 1076 Sq Ft');

  // --- Test 3: Bedrooms & Bathrooms Parsing ---
  console.log('\n--- Test Suite 3: BHK & Bathroom Extraction ---');
  assertEqual(PropertyDataCleaner.parseBedrooms('3 BHK Luxury Flat'), 3, 'Extract 3 BHK');
  assertEqual(PropertyDataCleaner.parseBedrooms('Studio Apartment'), 1, 'Extract Studio as 1 Bedroom');
  assertEqual(PropertyDataCleaner.parseBathrooms('2 Bathrooms'), 2, 'Extract 2 Bathrooms');

  // --- Test 4: Enum & Furnishing Normalization ---
  console.log('\n--- Test Suite 4: Property Enums & Furnishing ---');
  assertEqual(PropertyDataCleaner.parsePropertyType('Spacious Penthouse in Powai'), 'PENTHOUSE', 'Detect PENTHOUSE property type');
  assertEqual(PropertyDataCleaner.parsePropertyType('Commercial Office Space'), 'COMMERCIAL', 'Detect COMMERCIAL property type');
  assertEqual(PropertyDataCleaner.parseListingType('Apartment for Rent'), 'RENT', 'Detect RENT listing type');
  assertEqual(PropertyDataCleaner.parseFurnishingStatus('Semi-Furnished 2BHK'), 'SEMI_FURNISHED', 'Detect SEMI_FURNISHED status');

  // --- Test 5: Amenities & Image Normalization ---
  console.log('\n--- Test Suite 5: Amenities & Images ---');
  assertEqual(
    PropertyDataCleaner.cleanAmenities(['gym', 'Gym', 'SWIMMING POOL', '', 'Balcony']),
    ['Gym', 'Swimming Pool', 'Balcony'],
    'Deduplicate and title-case amenities'
  );

  const images = PropertyDataCleaner.normalizeImages(
    ['/photo1.jpg', 'https://example.com/photo2.jpg', 'data:image/png;base64,123'],
    'https://example.com'
  );
  assertEqual(images, ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'], 'Resolve relative image URLs and filter data URIs');

  // --- Test 6: Database Upsert & Deduplication ---
  console.log('\n--- Test Suite 6: Database Upsert & Duplicate Prevention ---');
  const mockProps = PropFlowScraperService.generateMockScrapedProperties();
  const testProp: ScrapedProperty = mockProps[0];

  const firstUpsert = await PropertyDatabaseService.upsertScrapedProperty(testProp);
  assertEqual(firstUpsert.success, true, 'First upsert succeeds');
  assertEqual(firstUpsert.isNew, true, 'First upsert marks listing as NEW');

  const secondUpsert = await PropertyDatabaseService.upsertScrapedProperty({
    ...testProp,
    price: 6800000, // price update
  });
  assertEqual(secondUpsert.success, true, 'Second upsert succeeds');
  assertEqual(secondUpsert.isNew, false, 'Second upsert detects duplicate externalId (isNew = false)');

  const allProps = await PropertyDatabaseService.getAllProperties();
  const updatedStoredProp = allProps.find((p) => p.externalId === testProp.externalId);
  assertEqual(updatedStoredProp?.price, 6800000, 'Price updated in DB without creating duplicate row');

  console.log('\n🎉 ALL SCRAPER TESTS PASSED SUCCESSFULLY!\n');
}

runTests().catch((err) => {
  console.error('\n❌ Test Failure:', err);
  process.exit(1);
});
