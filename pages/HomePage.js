const { BasePage } = require('../pageObjects/BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.productContainer = page.locator('.inventory_item');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addProductToCart(productName) {
    try {
      const addButton = this.productContainer
        .filter({ hasText: productName })
        .locator('button[data-test^="add-to-cart"]');
      await this.safeClick(addButton);
    } catch (error) {
      throw new Error(
        `Failed to add product "${productName}" to cart: ${error.message}`
      );
    }
  }

  async openCart() {
    await this.safeClick(this.cartLink);
  }

  async getCartBadgeCount() {
    if ((await this.cartBadge.count()) === 0) return '0';
    return await this.getText(this.cartBadge);
  }
}

module.exports = { HomePage };
