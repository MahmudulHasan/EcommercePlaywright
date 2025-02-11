import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { InvoicePage } from '../page-objects/InvoicePage';
import { pageFixture } from '../hooks/pageFixtures';

const invoicePage = new InvoicePage(pageFixture.page);
setDefaultTimeout(60000);

When('the user goes to {string} page', (menuItemName:string) => {
    invoicePage.openMenuItem(menuItemName);
});

Then('the user should see the invoice number in the list', () => {
    invoicePage.checkInvoiceNumber();
});