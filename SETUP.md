# Setup Instructions

## Initial Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd playwright-ui-automation-framework
```

### 2. Install Node.js

Ensure Node.js LTS is installed:

```bash
node --version  # Should be v16 or higher
npm --version
```

### 3. Install Project Dependencies

```bash
npm install
```

This installs:
- @playwright/test (testing framework)
- dotenv (environment configuration)
- eslint (code linting)
- prettier (code formatting)

### 4. Install Playwright Browsers

```bash
npx playwright install --with-deps
```

This installs Chromium, Firefox, and WebKit browsers.

### 5. Configure Environment

```bash
# Copy example configuration
cp .env.example .env

# Edit with your settings
# Update BASE_URL, credentials, timeouts, etc.
```

## Development Setup

### IDE Configuration

#### VS Code

1. Install Playwright Test for VS Code extension:
   - Open VS Code
   - Go to Extensions
   - Search for "Playwright Test for VS Code"
   - Install by Microsoft

2. Install ESLint extension:
   - Search for "ESLint"
   - Install by Dirk Bäumer

3. Install Prettier extension:
   - Search for "Prettier"
   - Install by Prettier

#### WebStorm / IntelliJ

1. Install Playwright Plugin:
   - Settings > Plugins
   - Search "Playwright"
   - Install

### Pre-commit Hooks (Optional)

Setup pre-commit hooks to auto-format and lint:

```bash
npm install husky lint-staged --save-dev
npx husky install
```

Create `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint:fix
npm run format
```

## Verify Installation

### Run Quick Test

```bash
# Run smoke tests
npm run smoke
```

Expected output:
- Tests execute in multiple browsers
- All tests pass
- Reports generated

### View Reports

```bash
npm run report
```

Browser opens with HTML report showing test results and artifacts.

## Troubleshooting Setup

### Issue: "playwright not found"

**Solution:**
```bash
npm install @playwright/test --save-dev
npx playwright install --with-deps
```

### Issue: "Port already in use"

**Solution:**
The framework doesn't use a local server, but if tests timeout:
```bash
# Increase timeout in .env
TIMEOUT=60000
```

### Issue: "Permission denied" on logs

**Solution:**
```bash
mkdir -p logs
chmod 755 logs
```

### Issue: Tests fail with HTTPS errors

**Solution:** Already configured in playwright.config.js:
```javascript
ignoreHTTPSErrors: true
```

## Running Tests

### Command Line

```bash
# All tests
npm test

# Smoke tests only
npm run smoke

# Regression tests only
npm run regression

# Specific test file
npx playwright test tests/LoginPageTest.spec.js

# Specific test
npx playwright test -g "Valid Login Test"

# Debug mode
npx playwright test --debug

# View mode (graphical)
npx playwright test --ui
```

### Options

```bash
# Run on specific browser
npx playwright test --project=chrome
npx playwright test --project=firefox
npx playwright test --project=webkit

# Show browser (headed mode)
npx playwright test --headed

# Generate report after run
npx playwright test --reporter=html
```

## Configuration Files Guide

### .env

Environment variables for:
- Application URL
- Credentials
- Timeout values
- Logging levels
- Test parallelization

**⚠️ Never commit credentials!** (already in .gitignore)

### playwright.config.js

Playwright framework settings:
- Test directory
- Browser configurations
- Retry strategy
- Reporting options

### .eslintrc.json

JavaScript linting rules enforcing:
- Code quality
- Naming conventions
- Error prevention
- Best practices

### .prettierrc.json

Code formatting standards:
- Indentation (2 spaces)
- Quote style (single quotes)
- Line length (100 chars)
- Semicolons

## Next Steps

1. **Read Documentation:** Review `README.md` for detailed usage
2. **Explore Framework:** Check page objects in `pages/` directory
3. **Write Tests:** Create new test files in `tests/` directory
4. **Configure CI/CD:** Update `.github/workflows/playwright.yml` for your needs
5. **Setup Monitoring:** Configure Slack webhook for notifications

## Support

For issues or questions:
1. Check troubleshooting section
2. Review test logs in `./logs/`
3. Check GitHub Actions workflow logs
4. Review Playwright documentation: https://playwright.dev

---

**Installation Complete!** 🎉

Your Playwright automation framework is ready to use.

Run `npm run smoke` to verify everything works.
