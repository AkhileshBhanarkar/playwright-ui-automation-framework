const { BasePage } = require('../pageObjects/BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueBtn = page.locator('#continue');
    this.finishBtn = page.locator('#finish');
    this.successMsg = page.locator('.complete-header');
  }

  async fillCheckoutDetails(first, last, zip) {
    try {
      await this.safeFill(this.firstName, first);
      await this.safeFill(this.lastName, last);
      await this.safeFill(this.postalCode, zip);
      await this.safeClick(this.continueBtn);
    } catch (error) {
      throw new Error(`Failed to fill checkout details: ${error.message}`);
    }
  }

  async finishOrder() {
    await this.safeClick(this.finishBtn);
  }

  async verifyOrderSuccess() {
    await this.waitForElement(this.successMsg);
    return await this.getText(this.successMsg);
  }
}

module.exports = { CheckoutPage };
