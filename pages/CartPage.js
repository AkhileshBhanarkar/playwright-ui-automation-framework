const { BasePage } = require('../pageObjects/BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.safeClick(this.checkoutBtn);
  }
}

module.exports = { CartPage };

