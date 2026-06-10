const { test } = require('@playwright/test');
const { PageObject } = require('../pageObjects/PageObject');
const { logger } = require('../utils/TestUtils');
const { TEST_DATA } = require('../utils/Constants');

/**
 * Custom test fixture extending Playwright's test
 * Provides pre-configured page objects and logging
 */
const customTest = test.extend({
  /**
   * Page Object Factory - automatically initialized for each test
   */
  pageObject: async ({ page }, use) => {
    logger.info('Setting up test fixtures');
    const pageObject = new PageObject(page);
    await use(pageObject);
    logger.info('Test fixture teardown complete');
  },

  /**
   * Login context - user already logged in
   */
  authenticatedPage: async ({ page }, use) => {
    logger.info('Setting up authenticated page');
    const pageObject = new PageObject(page);

    // Navigate to login
    await pageObject.getLoginPage().goToLoginPage();

    // Perform login
    await pageObject.getLoginPage().login(
      TEST_DATA.VALID_CREDENTIALS.username,
      TEST_DATA.VALID_CREDENTIALS.password
    );

    logger.info('User authenticated');

    // Use the authenticated page in test
    await use(pageObject);

    logger.info('Authenticated page teardown complete');
  },

  /**
   * Logger instance for current test
   */
  testLogger: async (_, use) => {
    await use(logger);
  },

  /**
   * Test context with metadata
   */
  testContext: async ({ page }, use) => {
    const context = {
      page,
      startTime: Date.now(),
      testName: '',
      passed: false,
    };

    await use(context);

    const duration = Date.now() - context.startTime;
    logger.info(
      `Test completed in ${duration}ms - Status: ${context.passed ? 'PASSED' : 'FAILED'}`
    );
  },
});

module.exports = { customTest };
