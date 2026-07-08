const { test, expect } = require('@playwright/test');
const { PageObject } = require('../pageObjects/PageObject');
const dataset = JSON.parse(
  JSON.stringify(require('../utils/PlaceOrderTestData.json'))
);
const { logger } = require('../utils/TestUtils');

for (const data of dataset) {
  test(`@Regression Complete order flow for '${data.productName}'`, async ({
    page,
  }) => {
    logger.info(
      `Starting test for product: ${data.productName} with user: ${data.username}`
    );

    const pageobject = new PageObject(page);

    // Login
    const loginPage = pageobject.getLoginPage();
    await loginPage.goToLoginPage();
    logger.info('Navigated to login page');

    await loginPage.login(data.username, data.password);
    logger.info(`Logged in with user: ${data.username}`);

    // Add product to cart
    const homePage = pageobject.getHomePage();
    await homePage.addProductToCart(data.productName);
    logger.info(`Added product to cart: ${data.productName}`);

    // Go to cart
    const ordersPage = pageobject.getOrdersPage();
    await ordersPage.goToCart();
    logger.info('Navigated to cart');

    // Proceed to checkout
    await ordersPage.proceedToCheckout();
    logger.info('Proceeded to checkout');

    // Fill checkout details
    const checkoutPage = pageobject.getCheckoutPage();
    await checkoutPage.fillCheckoutDetails(
      data.firstName,
      data.lastName,
      data.postalCode
    );
    logger.info('Filled checkout details');

    // Finish order
    await checkoutPage.finishOrder();
    logger.info('Finished order');

    // Verify success
    const msg = await checkoutPage.verifyOrderSuccess();
    expect(msg).toContain('Thank you');
    logger.info(`✓ Order success verified: ${msg}`);

    // Go back home
    const orderHistoryPage = pageobject.getOrderHistoryPage();
    await orderHistoryPage.goBackHome();
    logger.info('Navigated back to home');

    // Final assertion
    await expect(page).toHaveURL(/.*inventory\.html/);
    logger.info('✓ Test completed successfully');
  });
}
