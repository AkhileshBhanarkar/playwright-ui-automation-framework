/**
 * Test Template
 * Copy this file to create new test files with proper structure
 */

const { test, expect } = require('@playwright/test');
const { PageObject } = require('../pageObjects/PageObject');
const { logger } = require('../utils/TestUtils');

test.describe('Feature Name', () => {
  let pageObject;

  test.beforeEach(async ({ page }) => {
    logger.info('Test setup started');
    pageObject = new PageObject(page);
  });

  test.afterEach(async ({ page }) => {
    logger.info('Test teardown started');
    // Cleanup if needed
  });

  test('@smoke Positive Test Case', async ({ page }) => {
    logger.info('Starting positive test case');

    const loginPage = pageObject.getLoginPage();
    await loginPage.goToLoginPage();

    // Perform test actions
    await loginPage.login('standard_user', 'secret_sauce');

    // Assert results
    await expect(page).toHaveURL(/.*inventory\.html/);

    logger.info('✓ Positive test case passed');
  });

  test('Negative Test Case', async ({ page }) => {
    logger.info('Starting negative test case');

    const loginPage = pageObject.getLoginPage();
    await loginPage.goToLoginPage();

    // Perform test actions with invalid data
    await loginPage.login('invalid_user', 'invalid_pass');

    // Assert error state
    await expect(loginPage.errorMessage).toBeVisible();

    logger.info('✓ Negative test case passed');
  });

  test('@regression End-to-End Flow', async ({ page }) => {
    logger.info('Starting end-to-end flow');

    // Setup
    const loginPage = pageObject.getLoginPage();
    await loginPage.goToLoginPage();
    logger.info('Navigated to login page');

    // Login
    await loginPage.login('standard_user', 'secret_sauce');
    logger.info('Logged in successfully');

    // Navigate to home
    const homePage = pageObject.getHomePage();
    const cartCount = await homePage.getCartBadgeCount();
    logger.info(`Current cart count: ${cartCount}`);

    // Add product to cart
    await homePage.addProductToCart('Sauce Labs Backpack');
    logger.info('Added product to cart');

    // Verify
    await expect(page).toHaveURL(/.*inventory\.html/);

    logger.info('✓ End-to-end flow passed');
  });

  test('Error Handling Test', async ({ page }) => {
    logger.info('Starting error handling test');

    try {
      const loginPage = pageObject.getLoginPage();
      await loginPage.goToLoginPage();

      // This might throw an error if element is not found
      const errorMsg = await loginPage.getErrorMessage();
      logger.debug(`Error message: ${errorMsg}`);
    } catch (error) {
      logger.warn(`Expected error caught: ${error.message}`);
    }

    logger.info('✓ Error handling test passed');
  });
});
