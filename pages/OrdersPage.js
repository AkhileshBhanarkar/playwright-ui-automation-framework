const { BasePage } = require('../pageObjects/BasePage');

class OrdersPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartBtn = page.locator('#shopping_cart_container a');
    this.checkoutBtn = page.locator('#checkout');
  }

  async goToCart() {
    await this.safeClick(this.cartBtn);
  }

  async proceedToCheckout() {
    await this.safeClick(this.checkoutBtn);
  }
}

module.exports = { OrdersPage };
