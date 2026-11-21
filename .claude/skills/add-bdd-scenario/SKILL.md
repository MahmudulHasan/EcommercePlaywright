---
name: add-bdd-scenario
description: Add or change a Gherkin scenario in this repo (features/, steps/, page-objects/, fixtures/). Use when asked to write a new test, cover a new flow on practicesoftwaretesting.com, add steps, or extend a page object.
---

# Adding a BDD scenario

This suite runs Gherkin features through **Playwright Test + playwright-bdd**. Feature files are compiled to specs in `.features-gen/` by `bddgen` (never edit that folder).

## Layout
- `features/*.feature` – scenarios in user language. Tag with `@smoke` (fast, read-only) or `@regression` (end-to-end, writes data). Add `@admin` for admin flows.
- `steps/*.steps.ts` – thin step definitions. Import `Given/When/Then` from `../fixtures/fixtures`, never from `@cucumber/cucumber`.
- `page-objects/*.ts` – one class per page/component; locators as `readonly` fields set in the constructor.
- `fixtures/fixtures.ts` – Playwright fixtures: page objects, per-scenario `state`, and `createdProducts` (API cleanup).
- `test-data/users.ts` – roles (`admin`, `customer`, `customer2`) with env-var overrides.

## Workflow
1. Explore the real page first (a quick Playwright script or `npx playwright codegen https://practicesoftwaretesting.com`). The site changes; don't trust old selectors.
2. Reuse existing steps before writing new ones: `grep -rn "Given(\|When(\|Then(" steps/`.
3. Write the scenario in first person ("I search for …"), one behaviour per scenario. Use data tables for multi-field input.
4. Put interactions and assertions in the page object; the step just wires fixtures to page-object methods.
5. Pass data between steps through the `state` fixture, never module-level variables.
6. Anything a test creates must be unique per run (`Date.now()` suffix) and cleaned up in a fixture teardown.
7. Run `npm run check`, then `npx bddgen && npx playwright test --project=chromium --grep "<scenario name>"`.

## Rules (lint enforces most)
- Always `await` Playwright calls; `@typescript-eslint/no-floating-promises` is an error.
- Locators: `getByTestId` (the attribute is `data-test`) > `getByRole` > `getByText` > CSS. No XPath, no `nth()` unless order is the point.
- Web-first assertions only (`await expect(locator).toHaveText(...)`). No `waitForTimeout`, no `networkidle`, no `force: true`, no `isVisible()` checks before acting.
- Don't hard-code credentials in features; use a role name from `test-data/users.ts`.
- The site's product search mishandles multi-word queries; search by one distinctive word.
