import { expect } from '@playwright/test';
import type { DataTable } from 'playwright-bdd';
import { Given, Then, When } from '../fixtures/fixtures';

Given('I am on the contact page', async ({ contactPage }) => {
  await contactPage.goto();
});

When('I send the contact form without filling it in', async ({ contactPage }) => {
  await contactPage.submit.click();
});

Then('the contact form should show these errors:', async ({ contactPage }, table: DataTable) => {
  for (const { field, message } of table.hashes()) {
    await expect(contactPage.fieldError(field)).toHaveText(message);
  }
});
