# Playwright UI Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

A robust, scalable, and enterprise-ready UI automation framework built with [Playwright](https://playwright.dev/) using the **Page Object Model (POM)** design pattern. This framework is designed for reliable, maintainable, and cross-browser end-to-end web application testing.

---

## 🚀 Features

- ✅ Page Object Model (POM) architecture
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Parallel test execution
- ✅ Environment configuration using `.env`
- ✅ BasePage with reusable interaction methods
- ✅ Custom utilities and helper classes
- ✅ Logging support for debugging
- ✅ ESLint & Prettier integration
- ✅ GitHub Actions CI/CD support
- ✅ Modular and scalable project structure

---

## 🛠 Tech Stack

- Playwright
- JavaScript (Node.js)
- Page Object Model (POM)
- GitHub Actions
- ESLint
- Prettier

---

# Getting Started

## Prerequisites

- Node.js 18+
- npm

## Installation

Clone the repository

```sh
git clone https://github.com/AkhileshBhanarkar/playwright-ui-automation-framework.git
cd playwright-ui-automation-framework
```

Install dependencies

```sh
npm install
```

Install Playwright browsers

```sh
npx playwright install --with-deps
```

(Optional) Create your environment file

```sh
cp .env.example .env
```

Update the required values inside `.env`.

---

# Running Tests

Run all tests

```sh
npx playwright test
```

Run a specific test

```sh
npx playwright test tests/LoginPageTest.spec.js
```

Run in headed mode

```sh
npx playwright test --headed```

Run on a specific browser

```sh
npx playwright test --project=chrome
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run Smoke tests

```sh
npx playwright test --grep "@Smoke"
```

View HTML Report

```sh
npx playwright show-report
```

---

# Framework Structure

```
playwright-ui-automation-framework
│
├── .github/
│   └── workflows/
│
├── pages/
│
├── pageObjects/
│
├── tests/
│
├── utils/
│
├── test-data/
│
├── playwright.config.js
├── package.json
├── .env.example
└── README.md
```

---

# Framework Highlights

### BasePage

Provides reusable methods like

- Safe Click
- Safe Fill
- Wait Utilities
- Navigation Helpers
- Visibility Checks

which minimize flaky tests and improve maintainability.

---

### Page Object Model

Each page contains:

- Locators
- Page Actions
- Business Methods

keeping tests clean and reusable.

---

### Logging

The framework includes centralized logging to simplify debugging during local execution and CI runs.

---

### Code Quality

Integrated with

- ESLint
- Prettier

to maintain consistent code quality and formatting.

---

### CI/CD

Supports GitHub Actions for

- Automated test execution
- Cross-browser execution
- Playwright HTML Reports
- Artifact upload

---

# Best Practices

- Keep business logic inside Page Objects.
- Keep assertions inside test files.
- Avoid hardcoded waits.
- Prefer Playwright locators over XPath whenever possible.
- Store reusable values inside utility classes or constants.
- Keep tests independent and reusable.

---

# Creating a New Test

Create a new `.spec.js` file inside the `tests` folder.

Example:

```
tests/
    LoginPageTest.spec.js
    CheckoutTest.spec.js
```

Follow the same structure used in the existing test files.

---

# Documentation

Additional documentation is available below:

- 📘 **SETUP.md** — Installation & environment configuration
- 📘 **BEST_PRACTICES.md** — Framework best practices and coding guidelines

---

# Future Improvements

Planned enhancements include:

- Allure Reporting
- Docker Support
- Azure DevOps Pipeline
- API Testing Module
- Visual Regression Testing
- Mobile Browser Execution

---

# Contributing

Contributions are welcome.

Feel free to open an Issue or submit a Pull Request.
