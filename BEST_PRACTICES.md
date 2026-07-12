# Playwright Framework Best Practices

This document outlines the recommended practices for writing reliable, maintainable, and scalable automated tests using this Playwright framework.

---

# Test Structure

Organize tests using `test.describe()` and keep each test focused on a single business scenario.

### Good

```javascript
test.describe('Login', () => {

  test('@smoke Valid Login', async ({ page }) => {

    const loginPage = pageObject.getLoginPage();

    await loginPage.goToLoginPage();
    await loginPage.login(username, password);

    await expect(page).toHaveURL(/inventory/);

  });

});
```

### Avoid

- Multiple scenarios in one test
- Long test methods
- Duplicate test logic

---

# Page Object Model (POM)

Keep all locators and page actions inside Page Objects.

### Good

```javascript
await loginPage.login(username, password);
await cartPage.addItemToCart();
await checkoutPage.completeCheckout();
```

### Avoid

```javascript
await page.locator('#login-button').click();
await page.locator('.inventory_item').click();
```

Keeping selectors centralized makes maintenance easier.

---

# Assertions

Assertions should remain inside test files.

### Good

```javascript
await loginPage.login(username, password);

await expect(page).toHaveURL(/inventory/);
```

Negative scenario

```javascript
await loginPage.login('invalid_user', 'invalid_password');

await expect(loginPage.errorMessage)
    .toContainText('Username and password do not match');
```

Avoid placing assertions inside Page Objects.

---

# Waiting Strategy

Use Playwright's built-in auto waiting and explicit expectations.

### Recommended

```javascript
await this.safeClick(loginButton);

await expect(page).toHaveURL(/inventory/);
```

or

```javascript
await Promise.all([
    page.waitForURL('**/inventory.html'),
    loginButton.click()
]);
```

Avoid

```javascript
page.waitForTimeout(5000);
```

Hard-coded waits make tests slow and flaky.

---

# Logging

Log only important business actions.

### Good

```javascript
logger.info('User logged in');
logger.info('Order placed successfully');
logger.error(error.message);
```

Avoid logging every single interaction.

---

# Test Data

Keep test data centralized.

Example

```javascript
const { TEST_DATA } = require('../utils/Constants');

const username = TEST_DATA.VALID_CREDENTIALS.username;
```

Avoid hardcoding credentials inside tests.

---

# Test Organization

Group related tests together.

```javascript
test.describe('Checkout', () => {

    test('@smoke Complete Order', async () => {

    });

    test('@regression Remove Item', async () => {

    });

});
```

Use tags like

- @smoke
- @regression
- @sanity

to execute selective test suites.

---

# Prevent Flaky Tests

✔ Use Playwright auto waiting

✔ Wait for expected page state

✔ Prefer `expect()` over manual polling

✔ Keep tests independent

Avoid

- page.waitForTimeout()
- Shared test dependencies
- Fixed delays

---

# Environment Configuration

Store environment-specific values inside `.env`.

Example

```env
BASE_URL=https://www.saucedemo.com/
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
```

Never hardcode URLs throughout the framework.

---

# Code Quality

Before creating a Pull Request run:

```bash
npm run lint
npm run format
```

Follow:

- Consistent naming conventions
- Small reusable methods
- Meaningful test names
- No duplicated code

---

# Folder Structure

```
pages/
pageObjects/
tests/
utils/
test-data/
.github/
```

Each folder should have a single responsibility.

---

# Documentation

Use meaningful test names instead of lengthy comments.

Example

```javascript
test('@smoke User can complete checkout successfully', async () => {

});
```

Good naming reduces the need for excessive comments.

---

# Quick Checklist

Before committing code, verify:

- ✅ Tests pass locally
- ✅ No hardcoded waits
- ✅ No duplicated locators
- ✅ No hardcoded credentials
- ✅ Page Objects contain only page actions
- ✅ Assertions remain inside tests
- ✅ Logging added for important business steps
- ✅ Code formatted
- ✅ Lint checks passed

---

# Useful Resources

- Playwright Documentation  
  https://playwright.dev/docs/intro

- Playwright Best Practices  
  https://playwright.dev/docs/best-practices

- Page Object Model  
  https://playwright.dev/docs/pom

- GitHub Actions  
  https://playwright.dev/docs/ci

---

Following these practices helps keep the framework scalable, maintainable, and suitable for enterprise-level UI automation projects.