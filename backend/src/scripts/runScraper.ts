import { PropertyDatabaseService, PropFlowScraperService } from '../services/scraper';

async function main() {
  const args = process.argv.slice(2);
  const isMock = args.includes('--mock') || args.length === 0;

  console.log('====================================================');
  console.log('  🏢 PropFlow Real Estate Automated Scraper Service  ');
  console.log('====================================================\n');

  if (isMock) {
    console.log('[Runner Mode] Running with mock portal real estate listings feed...\n');
    const mockProps = PropFlowScraperService.generateMockScrapedProperties();

    console.log(`Extracted ${mockProps.length} property listings:`);
    mockProps.forEach((p, idx) => {
      console.log(`\n--- Property #${idx + 1} ---`);
      console.log(`External ID    : ${p.externalId}`);
      console.log(`Title          : ${p.title}`);
      console.log(`Type           : ${p.propertyType} (${p.listingType})`);
      console.log(`Price          : ${p.currency} ${p.price.toLocaleString()}`);
      console.log(`Carpet Area    : ${p.carpetAreaSqFt} SqFt`);
      console.log(`Bedrooms/Baths : ${p.bedrooms} BHK / ${p.bathrooms} Bath`);
      console.log(`Furnishing     : ${p.furnishingStatus || 'N/A'}`);
      console.log(`Location       : ${p.location.locality}, ${p.location.city}`);
      console.log(`Amenities      : ${p.amenities.join(', ')}`);
      console.log(`Source URL     : ${p.sourceUrl}`);
    });

    console.log('\n[Database Service] Upserting extracted listings into database...');
    const result = await PropertyDatabaseService.bulkUpsertScrapedProperties(mockProps);

    console.log(`\n✅ Database Upsert Complete:`);
    console.log(`   - Total Processed : ${result.processed}`);
    console.log(`   - Saved to DB     : ${result.saved}`);
    console.log(`   - New Records     : ${result.newCount}`);
    console.log(`   - Updated Records : ${result.updatedCount}`);

    // Verify deduplication by running upsert second time
    console.log('\n[Deduplication Test] Re-upserting same batch to verify duplicate prevention...');
    const reResult = await PropertyDatabaseService.bulkUpsertScrapedProperties(mockProps);
    console.log(`   - Total Processed : ${reResult.processed}`);
    console.log(`   - Saved to DB     : ${reResult.saved}`);
    console.log(`   - New Records     : ${reResult.newCount} (Expected: 0)`);
    console.log(`   - Updated Records : ${reResult.updatedCount} (Expected: ${mockProps.length})`);

    const stored = await PropertyDatabaseService.getAllProperties();
    console.log(`\n[Database Summary] Total stored properties in DB: ${stored.length}`);
  } else {
    const urlArgIndex = args.indexOf('--url');
    const targetUrl = urlArgIndex !== -1 ? args[urlArgIndex + 1] : args[0];

    const maxArgIndex = args.indexOf('--max');
    const maxListings = maxArgIndex !== -1 ? parseInt(args[maxArgIndex + 1], 10) : 5;

    const headless = !args.includes('--no-headless');

    if (!targetUrl || !targetUrl.startsWith('http')) {
      console.error('Error: Please provide a valid URL via --url <URL> or pass --mock');
      process.exit(1);
    }

    console.log(`Scraping target URL: ${targetUrl}`);
    const result = await PropFlowScraperService.runScrapeJob(targetUrl, {
      headless,
      maxListings,
      saveToDb: true,
    });

    console.log('\n================ Scrape Results ================');
    console.log(`Success           : ${result.success}`);
    console.log(`Total Found       : ${result.totalFound}`);
    console.log(`Saved to Database : ${result.savedToDbCount}`);
    console.log(`Duration          : ${(result.durationMs / 1000).toFixed(2)}s`);
    if (result.errors.length > 0) {
      console.log(`Errors            :\n - ${result.errors.join('\n - ')}`);
    }
  }
}

main().catch((err) => {
  console.error('Fatal CLI Error:', err);
  process.exit(1);
});
