import { Browser, BrowserContext, chromium, Page } from 'playwright';
import { ScraperOptions } from './types';

const REALISTIC_USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
];

export class StealthBrowserManager {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;

  /**
   * Launch chromium browser with stealth configurations and evasions
   */
  async launch(options: ScraperOptions = {}): Promise<{ browser: Browser; context: BrowserContext }> {
    const headless = options.headless ?? true;
    const slowMo = options.slowMo ?? 50;

    const selectedUserAgent =
      REALISTIC_USER_AGENTS[Math.floor(Math.random() * REALISTIC_USER_AGENTS.length)];

    this.browser = await chromium.launch({
      headless,
      slowMo,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certificate-errors',
        '--ignore-certificate-errors-spki-list',
        '--disable-blink-features=AutomationControlled',
        '--disable-features=IsolateOrigins,site-per-process',
      ],
    });

    this.context = await this.browser.newContext({
      userAgent: selectedUserAgent,
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      locale: 'en-US',
      timezoneId: 'Asia/Kolkata',
      extraHTTPHeaders: {
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Ch-Ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    // Inject stealth init scripts into all pages before load
    await this.context.addInitScript(() => {
      // 1. Mask navigator.webdriver
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });

      // 2. Mock chrome object
      // @ts-ignore
      window.chrome = {
        runtime: {},
        loadTimes: function () {},
        csi: function () {},
        app: {},
      };

      // 3. Mock plugins
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      });

      // 4. Mock languages
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
      });

      // 5. Mock permissions query
      const originalQuery = window.navigator.permissions.query;
      // @ts-ignore
      window.navigator.permissions.query = (parameters) =>
        parameters.name === 'notifications'
          ? Promise.resolve({ state: Notification.permission } as PermissionStatus)
          : originalQuery(parameters);
    });

    return { browser: this.browser, context: this.context };
  }

  /**
   * Helper utility for random delay (stealth timing)
   */
  static async randomDelay(minMs = 800, maxMs = 2500): Promise<void> {
    const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  /**
   * Human-like page scroll simulation
   */
  static async simulateHumanScroll(page: Page, scrolls = 3): Promise<void> {
    for (let i = 0; i < scrolls; i++) {
      await page.evaluate(() => {
        const scrollAmount = Math.floor(Math.random() * 400) + 200;
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      });
      await StealthBrowserManager.randomDelay(600, 1500);
    }
  }

  /**
   * Close browser resources
   */
  async close(): Promise<void> {
    if (this.context) {
      await this.context.close().catch(() => {});
      this.context = null;
    }
    if (this.browser) {
      await this.browser.close().catch(() => {});
      this.browser = null;
    }
  }
}
