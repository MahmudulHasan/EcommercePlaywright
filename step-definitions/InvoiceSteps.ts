import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixtures';

setDefaultTimeout(60000);

When('the user goes to {String} page', async (pageName:string) => {
    const userNameLocator = await pageFixture.page.locator('data-test="nav-menu"');
    await userNameLocator.click();
    const invoicePageLocator = await pageFixture.page.locator('data-test="nav-my-invoices"');
    await invoicePageLocator.click();
});

Then('the user should see the invoice number in the list', async () => {
    const invoiceNumberLocator = await pageFixture.page.locator('table tbody td').first();
    await console.log(invoiceNumberLocator.textContent()+ process.env.invoiceNumberShared);
    expect(invoiceNumberLocator).toHaveText(process.env.invoiceNumberShared);
});