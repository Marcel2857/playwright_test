# Playwright SauceDemo Tests

End-to-end UI tests for [SauceDemo](https://www.saucedemo.com/) — a demo e-commerce site for QA practice. Written in **Playwright (JavaScript)**, runs against Chromium, Firefox, and WebKit.

First ever project done to understand workflow and technologies behind Playwright

## What the tests cover

| Test | Type | What it verifies |
|------|------|------------------|
| `user can log-in and add item to cart` | Happy path | Login with valid credentials, product is added, cart badge shows correct count, product appears in cart |
| `locked user sees error message and can't log-in` | Negative / sad path | Locked-out user cannot log in, correct error message is shown, user stays on login page |

## Tech stack

- **Playwright** — test framework (web + mobile emulation)
- **JavaScript** — test language
- **GitHub Actions** — CI/CD (tests run automatically on every push)

## How to run

Prerequisites: **Node.js 18+** installed.

```bash

npm install

npx playwright install

npx playwright test


npx playwright test --ui

npx playwright show-report
```

## Project structure

```
playwright_test/
├── .github/workflows/   # CI configuration (GitHub Actions)
├── tests/
│   ├── example.spec.js          # Playwright default example
│   └── saucedemo-cart.spec.js   # My tests
├── playwright.config.js  # Playwright configuration
└── package.json
```

## Author

Marcel Krzysztoń — [GitHub](https://github.com/Marcel2857)