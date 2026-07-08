# Playwright UI Automation Framework

A robust, modular UI automation framework built with [Playwright](https://playwright.dev/) for end-to-end testing of web applications.

## Features
- Page Object Model (POM) structure for maintainable tests
- Easy configuration and environment setup
- Support for multiple browsers (Chromium, Firefox, WebKit)
- Parallel test execution
- Custom utilities and reusable components
- Example test cases for quick onboarding

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/AkhileshBhanarkar/playwright-ui-automation-framework.git
   cd playwright-ui-automation-framework
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running Tests
- To run all tests:
  ```sh
  npx playwright test
  ```
- To run a specific test file:
  ```sh
  npx playwright test tests/<your-test-file>.spec.js
  ```
- For headed mode (see the browser):
  ```sh
  npx playwright test --headed
  ```

### Project Structure
- `pages/` - Page Object Model classes
- `tests/` - Test cases
- `utils/` - Utility functions and helpers
- `playwright.config.js` - Playwright configuration

### Best Practices
- Use the POM classes in `pages/` for all page interactions
- Keep test data and selectors organized
- Leverage Playwright's built-in fixtures and hooks

## Documentation
- See [BEST_PRACTICES.md](BEST_PRACTICES.md) for tips
- See [SETUP.md](SETUP.md) for environment setup
- See [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for implementation details

## Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements.

## License
MIT License
