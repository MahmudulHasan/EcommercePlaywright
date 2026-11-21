---
name: debug-failing-test
description: Run this repo's Playwright BDD suite and diagnose failing or flaky scenarios. Use when tests fail locally or in GitHub Actions, or when asked to run the tests.
---

# Running and debugging the suite

## Run
- `npm test` – all scenarios on Chromium (runs `bddgen` first).
- `npm run test:smoke` / `npm run test:regression` – by tag.
- `npm run test:all-browsers` – Chromium and Firefox (install with `npx playwright install --with-deps chromium firefox`).
- One scenario: `npx bddgen && npx playwright test --project=chromium --grep "<scenario name>"`.
- Watch it: `npm run test:headed` or `npm run test:ui`.

## Diagnose
1. Read the failure in the `list` output: the step line and the locator that timed out.
2. Open `test-results/<test>/error-context.md`: it holds an ARIA snapshot of the page at failure. This is usually enough to see whether a selector changed or the page is in an unexpected state.
3. For deeper digging, re-run with `--trace on` and open it: `npx playwright show-trace test-results/<test>/trace.zip` (network, console, DOM per action). In CI, download the `playwright-report` artifact and run `npx playwright show-report <dir>`.
4. Check the live site by hand. practicesoftwaretesting.com is a shared public demo; its UI changes and its backend is occasionally slow.

## Fix properly
- Selector changed → update the page object, not the step.
- Timing → replace any manual wait with a web-first assertion on the state you need (e.g. wait for the product grid before searching).
- Never fix by adding `waitForTimeout`, `force: true`, or longer global timeouts. Retries are a CI safety net, not a fix; a test that only passes on retry shows as "flaky" in the report and should be fixed.
- If a regression scenario left data behind (e.g. an admin product), the `createdProducts` fixture should remove it; extend that teardown if a new kind of data is created.
