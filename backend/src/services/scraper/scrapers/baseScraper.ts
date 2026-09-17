import { BrowserContext, Page } from 'playwright';
import { StealthBrowserManager } from '../stealthBrowser';
import { ScrapedProperty, ScraperOptions } from '../types';

export abstract class BaseScraper {
  protected options: ScraperOptions;
  protected browserManager: StealthBrowserManager | null = null;
  protected context: BrowserContext | null = null;

  constructor(options: ScraperOptions = {}) {
    this.options = {
      headless: true,
      maxListings: 10,
      saveToDb: true,
      ...options,
    };
  }

  /**
   * Initialize Playwright stealth context
   */
  async init(): Promise<void> {
    this.browserManager = new StealthBrowserManager();
    const { context } = await this.browserManager.launch(this.options);
    this.context = context;
  }

  /**
   * Execute scraping flow for a target URL
   */
  abstract scrape(targetUrl: string): Promise<ScrapedProperty[]>;

  /**
   * Parse HTML or JSON-LD contents of a single listing page
   */
  abstract parseListingDetails(page: Page, url: string): Promise<ScrapedProperty | null>;

  /**
   * Close browser instance
   */
  async close(): Promise<void> {
    if (this.browserManager) {
      await this.browserManager.close();
      this.browserManager = null;
      this.context = null;
    }
  }
}
