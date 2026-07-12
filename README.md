# Playwright UI Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![CI](https://github.com/AkhileshBhanarkar/playwright-ui-automation-framework/actions/workflows/playwright.yml/badge.svg)

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

| Category | Technology |
|----------|------------|
| Automation | Playwright |
| Language | JavaScript (ES6) |
| Runtime | Node.js |
| Design Pattern | Page Object Model (POM) |
| CI/CD | GitHub Actions |
| Code Quality | ESLint, Prettier |
| Reporting | Playwright HTML Report |

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
├── pageObjects/
├── pages/
├── tests/
├── utils/
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── BEST_PRACTICES.md
├── README.md
├── SETUP.md
├── package.json
├── package-lock.json
└── playwright.config.js
```

---

# Framework Architecture

```text
                Test Cases
                     │
                     ▼
             Page Object Model
                     │
                     ▼
                BasePage
                     │
                     ▼
        Playwright Browser API
                     │
                     ▼
               Web Application
```

The framework follows the **Page Object Model (POM)** design pattern. Test cases interact only with Page Objects, which encapsulate page-specific locators and actions. Shared browser interactions are centralized in the `BasePage`, improving maintainability, reusability, and reducing duplicate code.

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

# Roadmap

Planned enhancements:

- ✅ Allure Reporting
- ✅ Docker Support
- ✅ Azure DevOps Pipeline
- ✅ API Testing (Playwright API)
- ✅ Visual Regression Testing
- ✅ Mobile Browser Testing
- ✅ Retry Analytics
- ✅ Slack Notifications

---

# Contributing

Contributions, suggestions, and bug reports are welcome.

If you have ideas to improve the framework, feel free to open an Issue or submit a Pull Request.
