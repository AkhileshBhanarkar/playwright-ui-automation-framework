const { Logger } = require('./Logger');

const logger = new Logger();

/**
 * Test utilities and helpers
 */
class TestUtils {
  /**
   * Generate test data for multiple scenarios
   */
  static getTestData(testName) {
    const data = {
      validCredentials: {
        username: process.env.STANDARD_USER || 'standard_user',
        password: process.env.STANDARD_PASSWORD || 'secret_sauce',
      },
      invalidCredentials: {
        username: 'invalid_user',
        password: 'invalid_password',
      },
      checkoutInfo: {
        firstName: 'Akhilesh',
        lastName: 'Bhanarkar',
        postalCode: '411033',
      },
    };

    logger.info(`Test data loaded for: ${testName}`);
    return data;
  }

  /**
   * Retry mechanism for flaky tests
   */
  static async retry(fn, maxAttempts = 3, delay = 1000) {
    let lastError;
    for (let i = 1; i <= maxAttempts; i++) {
      try {
        logger.debug(`Attempt ${i}/${maxAttempts}`);
        return await fn();
      } catch (error) {
        lastError = error;
        logger.warn(`Attempt ${i} failed: ${error.message}`);
        if (i < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    throw lastError;
  }

  /**
   * Compare actual vs expected values
   */
  static assertEquals(actual, expected, message) {
    if (actual !== expected) {
      const errorMsg = `Assertion failed: ${message}. Expected: ${expected}, Got: ${actual}`;
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
    logger.info(`✓ Assertion passed: ${message}`);
  }

  /**
   * Check if element contains text
   */
  static async verifyTextContains(locator, expectedText) {
    const actualText = await locator.textContent();
    if (!actualText.includes(expectedText)) {
      const errorMsg = `Text verification failed. Expected to contain: ${expectedText}, Got: ${actualText}`;
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
    logger.info(`✓ Text verified: ${expectedText} found in element`);
  }

  /**
   * Generate unique email for testing
   */
  static generateUniqueEmail() {
    const timestamp = Date.now();
    const email = `test_${timestamp}@example.com`;
    logger.debug(`Generated unique email: ${email}`);
    return email;
  }

  /**
   * Generate random product name (for data-driven tests)
   */
  static getRandomProduct(products) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const product = products[randomIndex];
    logger.debug(`Selected random product: ${product}`);
    return product;
  }

  /**
   * Wait and retry until condition is met
   */
  static async waitUntil(condition, maxWait = 10000, interval = 500) {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWait) {
      if (await condition()) {
        logger.debug('Condition met');
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    throw new Error(`Condition not met within ${maxWait}ms`);
  }

  /**
   * Clear sensitive data from logs
   */
  static sanitizeData(data) {
    const sensitiveFields = ['password', 'token', 'apiKey', 'ssn'];
    const sanitized = { ...data };
    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = '***REDACTED***';
      }
    });
    return sanitized;
  }
}

module.exports = { TestUtils, logger };
