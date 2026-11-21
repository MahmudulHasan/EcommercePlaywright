# EcommercePlaywright

![Playwright](https://img.shields.io/badge/Playwright-E2E%20Testing-green?style=flat&logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript)
![Gherkin](https://img.shields.io/badge/Gherkin-BDD-brightgreen?style=flat&logo=cucumber)

End-to-end BDD tests for the [Practice Software Testing](https://practicesoftwaretesting.com/) toolshop, written as Gherkin features and run by **Playwright Test** through [playwright-bdd](https://github.com/vitalets/playwright-bdd).

## Features
- Gherkin `.feature` files with typed step definitions that use Playwright fixtures.
- Page Object Model with `getByTestId` / `getByRole` locators and web-first assertions.
- Parallel runs, retries on CI, and HTML report with screenshots, videos and traces of failures.
- Cross-browser projects: Chromium and Firefox.
- Self-cleaning: products created by tests are removed through the API, even when a test fails.
- Type checking and ESLint (`typescript-eslint` + `eslint-plugin-playwright`), so a missing `await` fails the build.
- GitHub Actions workflow (manual runs only, see Notes).

## Getting started
Requires Node.js 20 or newer.

```sh
git clone https://github.com/MahmudulHasan/EcommercePlaywright.git
cd EcommercePlaywright
npm ci
npx playwright install --with-deps chromium   # add firefox for cross-browser runs
```

## Running tests
| Command | What it does |
| --- | --- |
| `npm test` | All scenarios on Chromium |
| `npm run test:smoke` | `@smoke` scenarios (login, validation, catalogue, contact form) |
| `npm run test:regression` | `@regression` scenarios (purchase, cart, admin products) |
| `npm run test:all-browsers` | Every scenario on Chromium and Firefox |
| `npm run test:headed` | Chromium with a visible browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run report` | Open the last HTML report |
| `npm run check` | Type check and lint |

Each test script runs `bddgen` first, which compiles `features/` into Playwright specs in `.features-gen/` (git-ignored).

## Project structure
```
features/        Gherkin scenarios
steps/           Step definitions (import Given/When/Then from fixtures/fixtures.ts)
page-objects/    One class per page or component
fixtures/        Playwright fixtures: page objects, per-scenario state, test-data cleanup
test-data/       Test users (overridable through environment variables)
.claude/skills/  Claude Code skills for writing and debugging scenarios
.github/workflows/playwright.yml   CI pipeline (manual trigger)
playwright.config.ts               Browsers, base URL, timeouts, reporters
```

## Configuration
Everything works with no setup, using the site's public demo accounts. To override, copy `.env.example` to `.env` and set any of `BASE_URL`, `API_BASE_URL`, `TEST_USER_PASSWORD`, `ADMIN_EMAIL`, `CUSTOMER_EMAIL`, `CUSTOMER2_EMAIL`. In GitHub Actions, set `BASE_URL` as a repository variable and `TEST_USER_PASSWORD` as a secret.

## Notes
- The suite runs against a shared public demo site. Regression scenarios place real (demo) orders and create and delete products, so CI keeps parallelism low.
- CI runs only when started by hand (Actions → E2E tests → Run workflow). Cloudflare on practicesoftwaretesting.com shows a bot check to GitHub-hosted runners, so every test fails there. Re-enable the automatic triggers in `.github/workflows/playwright.yml` once CI targets a self-hosted copy of the shop (it's [open source](https://github.com/testsmith-io/practice-software-testing)) or runs on a self-hosted runner.
- The site's product search does not handle multi-word queries well, so the admin scenario searches by a unique single word.

## Contributing
Contributions are welcome. Run `npm run check` and `npm test` before opening a pull request.

## License
MIT
