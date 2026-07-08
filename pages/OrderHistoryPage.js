const { BasePage } = require('../pageObjects/BasePage');

class OrderHistoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.backHomeBtn = page.locator('#back-to-products');
  }

  async goBackHome() {
    await this.safeClick(this.backHomeBtn);
  }
}

module.exports = { OrderHistoryPage };
