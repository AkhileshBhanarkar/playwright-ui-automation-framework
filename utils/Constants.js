/**
 * Constants and configuration values
 * Centralized place for all magic strings and numbers
 */

const TIMEOUT = {
  SHORT: 2000,
  MEDIUM: 5000,
  LONG: 10000,
  VERY_LONG: 30000,
};

const TEST_DATA = {
  VALID_CREDENTIALS: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.STANDARD_PASSWORD || 'secret_sauce',
  },
  INVALID_CREDENTIALS: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
  VISUAL_USER: {
    username: process.env.VISUAL_USER || 'visual_user',
    password: process.env.VISUAL_PASSWORD || 'secret_sauce',
  },
  CHECKOUT_INFO: {
    firstName: 'Akhilesh',
    lastName: 'Bhanarkar',
    postalCode: '411033',
  },
};

const SELECTORS = {
  // Login Page
  USERNAME_INPUT: '#user-name',
  PASSWORD_INPUT: '#password',
  LOGIN_BUTTON: '#login-button',
  ERROR_MESSAGE: '[data-test="error"]',

  // Home Page
  PRODUCT_CONTAINER: '.inventory_item',
  CART_LINK: '[data-test="shopping-cart-link"]',
  CART_BADGE: '.shopping_cart_badge',
  ADD_TO_CART_BUTTON: 'button[data-test^="add-to-cart"]',

  // Cart Page
  CART_ITEMS: '.cart_item',
  CHECKOUT_BTN: '[data-test="checkout"]',

  // Checkout Page
  FIRST_NAME: '#first-name',
  LAST_NAME: '#last-name',
  POSTAL_CODE: '#postal-code',
  CONTINUE_BTN: '#continue',
  FINISH_BTN: '#finish',
  SUCCESS_MSG: '.complete-header',

  // Orders Page
  CART_BTN: '#shopping_cart_container a',

  // Order History Page
  BACK_HOME_BTN: '#back-to-products',
};

const URLS = {
  BASE: process.env.BASE_URL || 'https://www.saucedemo.com/',
  LOGIN: process.env.BASE_URL || 'https://www.saucedemo.com/',
  INVENTORY: process.env.BASE_URL + 'inventory.html',
  CART: process.env.BASE_URL + 'cart.html',
  CHECKOUT: process.env.BASE_URL + 'checkout-step-one.html',
};

const MESSAGES = {
  ERROR_INVALID_CREDENTIALS:
    'Epic sadface: Username and password do not match any user in this service',
  SUCCESS_ORDER: 'Thank you',
  ERROR_ELEMENT_NOT_FOUND: 'Element not found',
  ERROR_TIMEOUT: 'Operation timed out',
};

const PRODUCTS = {
  BACKPACK: 'Sauce Labs Backpack',
  FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
  BIKE_LIGHT: 'Sauce Labs Bike Light',
  BOLT_SHIRT: 'Sauce Labs Bolt T-Shirt',
  SAUCE_SHIRT_RED: 'Sauce Labs T-Shirt (Red)',
  TEST_ALL_ITEMS: 'Test.allTheThings() T-Shirt (Red)',
};

const WAIT_CONDITIONS = {
  PAGE_LOAD: 'networkidle',
  DOM_READY: 'domcontentloaded',
  LOAD_EVENT: 'load',
};

const BROWSER_CONTEXTS = {
  CHROMIUM: 'chromium',
  FIREFOX: 'firefox',
  WEBKIT: 'webkit',
};

const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

module.exports = {
  TIMEOUT,
  TEST_DATA,
  SELECTORS,
  URLS,
  MESSAGES,
  PRODUCTS,
  WAIT_CONDITIONS,
  BROWSER_CONTEXTS,
  LOG_LEVELS,
};
