const { test, expect } = require('@playwright/test');
const { PageObject } = require('../pageObjects/PageObject');
const { logger } = require('../utils/TestUtils');

test('@Smoke Valid Login Test', async ({ page }) => {
  logger.info('Starting Valid Login Test');

  const pageObject = new PageObject(page);
  const username = process.env.STANDARD_USER || 'standard_user';
  const password = process.env.STANDARD_PASSWORD || 'secret_sauce';

  logger.debug(`Username: ${username}`);

  const loginPage = pageObject.getLoginPage();
  await loginPage.goToLoginPage();
  logger.info('Navigated to login page');

  await loginPage.login(username, password);
  logger.info('Logged in successfully');

  await expect(page).toHaveURL(/.*inventory\.html/);
  logger.info('✓ Verified URL after login');
});

test('Invalid Login Test', async ({ page }) => {
  logger.info('Starting Invalid Login Test');

  const pageObject = new PageObject(page);
  const username = 'invalid_user';
  const password = 'invalid_password';

  const loginPage = pageObject.getLoginPage();
  await loginPage.goToLoginPage();
  logger.info('Navigated to login page');

  await loginPage.login(username, password);
  logger.info('Attempted login with invalid credentials');

  await expect(loginPage.errorMessage).toBeVisible({ timeout: 5000 });
  logger.info('Error message is visible');

  await expect(loginPage.errorMessage).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
  logger.info('✓ Error message verified');
});


