import { expect } from '@playwright/test';
import type { DataTable } from 'playwright-bdd';
import { Given, Then, When } from '../fixtures/fixtures';

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.goto();
});

When(
  'I sign in with an unregistered email and the password {string}',
  async ({ loginPage }, password: string) => {
    // A made-up address: repeated failed logins could lock one of the shared demo accounts.
    await loginPage.submitCredentials(`not-registered-${Date.now()}@example.com`, password);
  },
);

When('I submit the login form without credentials', async ({ loginPage }) => {
  await loginPage.submit.click();
});

Then('I should see the login error {string}', async ({ loginPage }, message: string) => {
  await expect(loginPage.loginError).toHaveText(message);
});

Then('I should still be on the login page', async ({ page }) => {
  await expect(page).toHaveURL(/\/auth\/login$/);
});

Then('the login form should show these errors:', async ({ loginPage }, table: DataTable) => {
  for (const { field, message } of table.hashes()) {
    await expect(loginPage.fieldError(field)).toHaveText(message);
  }
});
