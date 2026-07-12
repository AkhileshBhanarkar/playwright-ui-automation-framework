/**
 * Base Page Object class with common methods and wait strategies
 * All page objects should extend this class
 */
const { URLS } = require('../utils/Constants');

class BasePage {
  constructor(page) {
    this.page = page;
    this.defaultTimeout = parseInt(process.env.EXPECT_TIMEOUT) || 5000;
  }

  /**
   * Navigate to a URL
   * @param {string} url - Full URL or path
   */
  async goto(url) {
    const targetUrl = url || process.env.BASE_URL || URLS.BASE || URLS.LOGIN;

    if (!targetUrl || typeof targetUrl !== 'string') {
      throw new Error('Navigation URL is not configured. Set BASE_URL or provide a URL.');
    }

    try {
      await this.page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (error) {
      throw new Error(`Failed to navigate to ${targetUrl}: ${error.message}`);
    }
  }

  /**
   * Wait for an element and return it
   * @param {Locator} locator - Playwright locator
   * @param {number} timeout - Custom timeout in ms
   */
  async waitForElement(locator, timeout = this.defaultTimeout) {
    try {
      await locator.waitFor({ timeout, state: 'visible' });
      return locator;
    } catch (error) {
      throw new Error(`Element not found within ${timeout}ms: ${error.message}`);
    }
  }

  /**
   * Safe click with error handling
   * @param {Locator} locator - Element to click
   * @param {number} timeout - Custom timeout
   */
  async safeClick(locator, timeout = this.defaultTimeout) {
    try {
      await this.waitForElement(locator, timeout);
      await locator.click();
    } catch (error) {
      throw new Error(`Failed to click element: ${error.message}`);
    }
  }

  /**
   * Safe fill with error handling
   * @param {Locator} locator - Input element
   * @param {string} text - Text to fill
   * @param {number} timeout - Custom timeout
   */
  async safeFill(locator, text, timeout = this.defaultTimeout) {
    try {
      await this.waitForElement(locator, timeout);
      await locator.fill(text);
    } catch (error) {
      throw new Error(`Failed to fill element: ${error.message}`);
    }
  }

  /**
   * Get text with error handling
   * @param {Locator} locator - Element to get text from
   */
  async getText(locator) {
    try {
      await this.waitForElement(locator);
      return (await locator.textContent()).trim();
    } catch (error) {
      throw new Error(`Failed to get text: ${error.message}`);
    }
  }

  /**
   * Verify element is visible
   * @param {Locator} locator - Element to verify
   */
  async isVisible(locator) {
    try {
      return await locator.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Wait for navigation after action
   * @param {Function} action - Async function that triggers navigation
   */
  async waitForNavigation(action) {
    try {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 30000 }),
        action(),
      ]);
    } catch (error) {
      throw new Error(`Navigation failed: ${error.message}`);
    }
  }

  /**
   * Get current URL
   */
  getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Wait for timeout
   * @param {number} ms - Milliseconds to wait
   */
  async wait(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = { BasePage };
