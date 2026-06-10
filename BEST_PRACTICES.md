# Best Practices Guide

## Testing Best Practices

### 1. Test Structure

#### Good ✅

```javascript
test('@smoke Valid Login', async ({ page }) => {
  logger.info('Test started');

  const pageObject = new PageObject(page);
  const loginPage = pageObject.getLoginPage();

  // Setup
  await loginPage.goToLoginPage();
  logger.info('Navigated to login page');

  // Action
  await loginPage.login(username, password);
  logger.info('Login attempted');

  // Assert
  await expect(page).toHaveURL(/.*inventory\.html/);
  logger.info('✓ Login successful');
});
```

#### Bad ❌

```javascript
test('Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
});
```

**Why?**
- Good: Uses page objects, logging, waits, maintainable
- Bad: Brittle, hard to maintain, no error context

### 2. Using Page Objects

#### Good ✅

```javascript
const loginPage = pageObject.getLoginPage();
await loginPage.login(username, password);
await loginPage.getErrorMessage();
```

#### Bad ❌

```javascript
await page.locator('#user-name').fill(username);
await page.locator('#password').fill(password);
await page.locator('#login-button').click();
```

**Why?**
- Good: Centralized selectors, reusable, easy to update
- Bad: Scattered selectors, duplicated code, maintenance nightmare

### 3. Wait Strategies

#### Good ✅

```javascript
// Explicit wait from BasePage
await basePage.waitForElement(locator, 5000);
await basePage.safeClick(locator);
await basePage.waitForNavigation(() => action());
```

#### Bad ❌

```javascript
// Implicit waits
await locator.click();
await page.waitForTimeout(2000); // Hard-coded delay
```

**Why?**
- Good: Predictable, reliable, no flakiness
- Bad: Flaky, slow, unpredictable

### 4. Error Handling

#### Good ✅

```javascript
try {
  await basePage.safeFill(locator, text);
  logger.info('Element filled successfully');
} catch (error) {
  logger.error(`Failed to fill element: ${error.message}`);
  throw new Error(`Test failed: ${error.message}`);
}
```

#### Bad ❌

```javascript
await locator.fill(text); // No error handling
await page.waitForTimeout(1000); // Silence failures
```

**Why?**
- Good: Descriptive errors, easy debugging, readable logs
- Bad: Silent failures, hard to diagnose

### 5. Test Data Management

#### Good ✅

```javascript
const { TEST_DATA } = require('../utils/Constants');

const username = TEST_DATA.VALID_CREDENTIALS.username;
const password = TEST_DATA.VALID_CREDENTIALS.password;
```

#### Bad ❌

```javascript
const username = 'standard_user';
const password = 'secret_sauce';
// Hardcoded in test
```

**Why?**
- Good: Centralized, easy to update, maintainable
- Bad: Scattered, duplicated, hard to maintain

### 6. Logging

#### Good ✅

```javascript
logger.info('Starting login process');
await loginPage.login(username, password);
logger.info('Login completed');

if (errorOccurred) {
  logger.error('Login failed with error: ' + error);
}
```

#### Bad ❌

```javascript
// No logging - silent operations
await loginPage.login(username, password);

// Too verbose
console.log('user', username);
console.log('pass', '****');
```

**Why?**
- Good: Easy debugging, CI/CD visibility, audit trail
- Bad: No context, hard to debug, quiet failures

### 7. Assertions

#### Good ✅

```javascript
await expect(page).toHaveURL(/.*inventory\.html/);
await expect(element).toBeVisible({ timeout: 5000 });
await expect(text).toContain('Order Placed');
```

#### Bad ❌

```javascript
expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
expect(await element.isVisible()).toBe(true);
expect(text).toBe('Order Placed Successfully!');
```

**Why?**
- Good: Retry on failure, built-in waits, flexible matching
- Bad: One-shot failure, no waits, strict matching

### 8. Test Organization

#### Good ✅

```javascript
test.describe('Login Functionality', () => {
  test('@smoke Valid Login', async ({ page }) => {
    // Test code
  });

  test('Invalid Credentials', async ({ page }) => {
    // Test code
  });

  test('@regression Remember Password', async ({ page }) => {
    // Test code
  });
});
```

#### Bad ❌

```javascript
test('Test 1', async ({ page }) => {});
test('Test 2', async ({ page }) => {});
test('Test 3', async ({ page }) => {});
```

**Why?**
- Good: Organized, tagged, grouped by feature
- Bad: Flat, no context, hard to navigate

### 9. Flaky Test Prevention

#### Good ✅

```javascript
// Use explicit waits
await basePage.waitForElement(locator);

// Use retry mechanism
await TestUtils.retry(
  () => basePage.safeClick(locator),
  3,
  1000
);

// Use proper conditions
await TestUtils.waitUntil(() => condition());
```

#### Bad ❌

```javascript
// Hard-coded delays
await page.waitForTimeout(5000);

// Direct interaction without waits
await locator.click();

// One-shot assertions
expect(value).toBe(expected);
```

**Why?**
- Good: Reliable, no false failures, maintainable
- Bad: Flaky, slow, unpredictable

### 10. Constants and Configuration

#### Good ✅

```javascript
const { TIMEOUT, SELECTORS, TEST_DATA } = require('../utils/Constants');

await basePage.waitForElement(locator, TIMEOUT.MEDIUM);
await page.locator(SELECTORS.LOGIN_BUTTON).click();
```

#### Bad ❌

```javascript
await basePage.waitForElement(locator, 5000);
await page.locator('#login-button').click();
```

**Why?**
- Good: DRY, maintainable, consistent
- Bad: Scattered magic numbers, duplicated values

## Code Quality

### Linting

Always run before committing:

```bash
npm run lint:fix
npm run format
```

### Common Issues

```javascript
// ❌ Missing semicolons
const test = 123

// ✅ Semicolons
const test = 123;

// ❌ var keyword
var test = 123;

// ✅ const/let
const test = 123;

// ❌ Double quotes
const name = "John";

// ✅ Single quotes
const name = 'John';
```

## Performance Tips

### 1. Parallel Execution

```javascript
// Good - independent tests run in parallel
test('Test 1', async ({}) => {});
test('Test 2', async ({}) => {});

// Bad - tests depend on each other
test('Create User', async ({}) => {
  await createUser();
});

test('Login User', async ({}) => {
  // Depends on previous test
});
```

### 2. Minimize Wait Times

```javascript
// Good
await basePage.waitForElement(locator, 5000);

// Bad
await page.waitForTimeout(30000);
```

### 3. Reuse Sessions

```javascript
// Good - reuse authenticated session
const authenticatedPage = pageObject.getLoginPage();
await authenticatedPage.login(user, pass);

// Bad - new login for each test
await login();
await anotherTest();
await login(); // Repeated
```

## Security Best Practices

### 1. Never Hardcode Credentials

```javascript
// Good
const username = process.env.STANDARD_USER;

// Bad
const username = 'standard_user'; // Visible in code
```

### 2. Sanitize Sensitive Data

```javascript
const { TestUtils } = require('../utils/TestUtils');

const safeData = TestUtils.sanitizeData(userCredentials);
logger.info(`User data: ${JSON.stringify(safeData)}`);
```

### 3. Use .env for Secrets

```env
# Good - in .env
DB_PASSWORD=secure_password

# Never commit .env to git
# Add to .gitignore
```

## Documentation

### Test Documentation

```javascript
/**
 * Verify user can successfully purchase items
 * 
 * Steps:
 * 1. Login with valid credentials
 * 2. Add item to cart
 * 3. Complete checkout
 * 4. Verify order confirmation
 * 
 * Expected: Order placed successfully
 * Tags: @regression, @critical
 */
test('Complete Order Flow', async ({ page }) => {
  // Test code
});
```

### Comment Guidelines

```javascript
// ✅ Good - explains WHY
// Wait for API response before checking inventory
await basePage.waitForElement(locator);

// ❌ Bad - explains WHAT (code already shows this)
// Wait for element
await basePage.waitForElement(locator);

// ❌ Bad - unnecessary comment
const count = 5; // Set count to 5
```

---

## Quick Reference

| Do | Don't |
|---|---|
| Use page objects | Query selectors directly |
| Add logging | Silent operations |
| Use constants | Hardcode values |
| Use wait strategies | Hard-coded delays |
| Use .env for secrets | Hardcode credentials |
| Run linter before commit | Commit unformatted code |
| Use descriptive names | Use ambiguous names |
| Group related tests | Flat test structure |
| Use test tags | Untagged tests |
| Handle errors explicitly | Ignore errors |

---

## Resources

- [Playwright Testing Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [ESLint Rules](https://eslint.org/docs/rules/)

