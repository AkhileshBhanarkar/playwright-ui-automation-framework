# Playwright UI Automation Framework

A comprehensive, production-ready Playwright UI automation testing framework with modern best practices, lazy loading, logging, and CI/CD integration.

## 📋 Features

- ✅ **Page Object Model** with lazy loading initialization
- ✅ **Base Page Class** with common methods and wait strategies
- ✅ **Comprehensive Logging** framework with file output
- ✅ **Environment Configuration** with .env support
- ✅ **Cross-browser Testing** (Chrome, Firefox, Safari)
- ✅ **Test Utilities** with retry logic, data generation, and helpers
- ✅ **ESLint & Prettier** for code quality
- ✅ **Multi-browser Reporting** (HTML, JSON, JUnit XML)
- ✅ **GitHub Actions CI/CD** with Slack notifications
- ✅ **Test Tagging** for smoke and regression tests

## 📦 Prerequisites

- Node.js 16+ (LTS recommended)
- npm or yarn

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repo-url>
cd playwright-ui-automation-framework

# Install dependencies
npm install
```

### 2. Environment Setup

Copy the example environment file and update with your values:

```bash
cp .env.example .env
```

Configure `.env`:

```env
BASE_URL=https://www.saucedemo.com/
STANDARD_USER=standard_user
STANDARD_PASSWORD=secret_sauce
HEADLESS=true
WORKERS=2
TIMEOUT=40000
EXPECT_TIMEOUT=5000
LOG_LEVEL=info
```

### 3. Run Tests

```bash
# Run all tests
npm test

# Run only smoke tests
npm run smoke

# Run only regression tests
npm run regression

# View HTML report
npm run report
```

## 📁 Project Structure

```
playwright-ui-automation-framework/
├── pageObjects/
│   ├── BasePage.js          # Base class with common methods
│   └── PageObject.js        # Lazy-loaded page object factory
├── pages/
│   ├── LoginPage.js
│   ├── HomePage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── OrdersPage.js
│   └── OrderHistoryPage.js
├── tests/
│   ├── LoginPageTest.spec.js
│   └── TestCase.spec.js
├── utils/
│   ├── Logger.js            # Logging framework
│   ├── TestUtils.js         # Test utilities & helpers
│   └── PlaceOrderTestData.json
├── playwright.config.js     # Playwright configuration
├── .env                     # Environment variables
├── .eslintrc.json          # ESLint configuration
├── .prettierrc.json        # Prettier configuration
└── README.md
```

## 🛠️ Core Components

### BasePage.js

Base class extending all page objects with common methods:

```javascript
// Navigation
await basePage.goto(url);

// Wait strategies
await basePage.waitForElement(locator, timeout);

// Safe interactions
await basePage.safeClick(locator);
await basePage.safeFill(locator, text);
await basePage.getText(locator);
await basePage.isVisible(locator);

// Navigation waits
await basePage.waitForNavigation(() => action());
```

### Logger.js

Centralized logging with file output:

```javascript
const { logger } = require('./utils/TestUtils');

logger.info('Test started');
logger.debug('Debug information');
logger.warn('Warning message');
logger.error('Error message');
```

Logs are written to: `./logs/test.log`

### TestUtils.js

Utility functions for testing:

```javascript
const { TestUtils, logger } = require('./utils/TestUtils');

// Test data
const data = TestUtils.getTestData('loginTest');

// Retry mechanism
await TestUtils.retry(asyncFunction, maxAttempts, delay);

// Assertions
TestUtils.assertEquals(actual, expected, 'message');

// Text verification
await TestUtils.verifyTextContains(locator, 'expected text');

// Generate unique data
const email = TestUtils.generateUniqueEmail();
const product = TestUtils.getRandomProduct(products);

// Wait until condition
await TestUtils.waitUntil(condition, maxWait, interval);

// Data sanitization
const safe = TestUtils.sanitizeData(sensitiveData);
```

## 🎯 Writing Tests

### Test Structure

```javascript
const { test, expect } = require('@playwright/test');
const { PageObject } = require('../pageObjects/PageObject');
const { logger } = require('../utils/TestUtils');

test('@Smoke Test Name', async ({ page }) => {
  logger.info('Test started');
  
  const pageObject = new PageObject(page);
  const loginPage = pageObject.getLoginPage();
  
  await loginPage.goToLoginPage();
  await loginPage.login(username, password);
  
  await expect(page).toHaveURL(/.*inventory\.html/);
  logger.info('✓ Test passed');
});
```

### Test Tags

- `@smoke` - Critical tests for quick feedback
- `@regression` - Full test suite for comprehensive validation

## ⚙️ Configuration

### Playwright Config

Modify `playwright.config.js`:

```javascript
{
  testDir: './tests',
  retries: 1,
  workers: 2,
  timeout: 40000,
  expect: { timeout: 5000 },
  projects: ['chrome', 'firefox', 'webkit']
}
```

### Environment Variables

Key environment variables in `.env`:

```env
BASE_URL=https://app.example.com
STANDARD_USER=user@example.com
STANDARD_PASSWORD=password123
TIMEOUT=40000
EXPECT_TIMEOUT=5000
HEADLESS=true
LOG_LEVEL=info
```

## 📊 Reports

### HTML Report

```bash
npm run report
```

Opens detailed HTML report with:
- Test results
- Screenshots on failure
- Video recordings
- Trace files

### Test Results Artifacts

Generated automatically in `test-results/`:

- `results.json` - Test metrics (JSON format)
- `junit.xml` - JUnit format for CI integration
- `playwright-report/` - HTML report

## 🔧 Code Quality

### Lint Code

```bash
# Check for linting issues
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Format Code

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

## 🤖 CI/CD Pipeline

### GitHub Actions

The `.github/workflows/playwright.yml` includes:

- ✅ Automated test execution on push/PR
- ✅ Smoke and regression test separation
- ✅ Multi-browser testing (Chrome, Firefox, Safari)
- ✅ Artifact uploads (reports, logs)
- ✅ PR comments with test results
- ✅ Slack notifications on success/failure
- ✅ Scheduled daily test runs

### Setup Slack Notifications

1. Create Slack incoming webhook: https://api.slack.com/messaging/webhooks
2. Add to GitHub secrets as `SLACK_WEBHOOK`
3. Workflow will send notifications on test status

## 📝 Best Practices

### 1. Use Page Objects

```javascript
// ✅ Good - Using page object
const loginPage = pageObject.getLoginPage();
await loginPage.login(username, password);

// ❌ Avoid - Direct element interaction
await page.locator('#user-name').fill(username);
```

### 2. Add Logging

```javascript
// ✅ Good
logger.info('Test started');
await loginPage.login(user, pass);
logger.info('Login successful');

// ❌ Avoid - Silent operations
await loginPage.login(user, pass);
```

### 3. Use Wait Strategies

```javascript
// ✅ Good - From BasePage
await basePage.waitForElement(locator);
await basePage.safeClick(locator);

// ❌ Avoid - Direct clicks
await locator.click();
```

### 4. Error Handling

```javascript
// ✅ Good - Descriptive errors
throw new Error(`Failed to add product: ${error.message}`);

// ❌ Avoid - Generic errors
throw error;
```

### 5. Test Data

```javascript
// ✅ Good - From environment
const username = process.env.STANDARD_USER;

// ❌ Avoid - Hardcoded
const username = 'standard_user';
```

## 🐛 Troubleshooting

### Tests timing out

Increase timeout in `.env`:

```env
TIMEOUT=60000
EXPECT_TIMEOUT=10000
```

### Element not found

Check selectors and wait strategies:

```javascript
// Use explicit waits
await basePage.waitForElement(locator, 10000);

// Add debug logging
logger.debug(`Looking for element: ${selector}`);
```

### Flaky tests

Use retry mechanism:

```javascript
await TestUtils.retry(
  () => basePage.safeClick(locator),
  3,  // max attempts
  1000 // delay between attempts
);
```

### Log file issues

Check log directory permissions:

```bash
mkdir -p logs
chmod 755 logs
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [GitHub Actions Documentation](https://docs.github.com/actions)

## 🤝 Contributing

1. Create a feature branch
2. Follow linting rules: `npm run lint:fix`
3. Format code: `npm run format`
4. Write tests with proper tags
5. Add logging for debugging
6. Submit PR with test results

## 📄 License

ISC

## 👤 Author

Akhilesh Bhanarkar

---

**Last Updated:** 2024
**Framework Version:** 2.0.0
