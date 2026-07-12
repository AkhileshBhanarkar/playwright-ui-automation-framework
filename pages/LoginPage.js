const { BasePage } = require('../pageObjects/BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goToLoginPage(url) {
    await this.goto(url || process.env.BASE_URL);
  }

  async login(username, password) {
    try {
      await this.safeFill(this.usernameInput, username);
      await this.safeFill(this.passwordInput, password);
      await this.safeClick(this.loginButton);
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isErrorMessageVisible() {
    return await this.isVisible(this.errorMessage);
  }
}

module.exports = { LoginPage };
