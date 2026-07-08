const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { OrdersPage } = require('../pages/OrdersPage');
const { OrderHistoryPage } = require('../pages/OrderHistoryPage');

/**
 * Page Object Factory with Lazy Loading
 * Initializes page objects only when they are first accessed
 */
class PageObject {
  constructor(page) {
    this.page = page;
    this._loginPage = null;
    this._homePage = null;
    this._cartPage = null;
    this._ordersPage = null;
    this._checkoutPage = null;
    this._orderHistoryPage = null;
  }

  getLoginPage() {
    if (!this._loginPage) {
      this._loginPage = new LoginPage(this.page);
    }
    return this._loginPage;
  }

  getHomePage() {
    if (!this._homePage) {
      this._homePage = new HomePage(this.page);
    }
    return this._homePage;
  }

  getCartPage() {
    if (!this._cartPage) {
      this._cartPage = new CartPage(this.page);
    }
    return this._cartPage;
  }

  getOrdersPage() {
    if (!this._ordersPage) {
      this._ordersPage = new OrdersPage(this.page);
    }
    return this._ordersPage;
  }

  getCheckoutPage() {
    if (!this._checkoutPage) {
      this._checkoutPage = new CheckoutPage(this.page);
    }
    return this._checkoutPage;
  }

  getOrderHistoryPage() {
    if (!this._orderHistoryPage) {
      this._orderHistoryPage = new OrderHistoryPage(this.page);
    }
    return this._orderHistoryPage;
  }
}

module.exports = { PageObject };
