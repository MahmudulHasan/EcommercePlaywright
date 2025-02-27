import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { InvoicePage } from '../page-objects/InvoicePage';
import { pageFixture } from '../hooks/pageFixtures';

setDefaultTimeout(60000);
let invoicePage: InvoicePage;

When('the user goes to {string} page', (menuItemName:string) => {
    invoicePage = new InvoicePage(pageFixture.page);
    invoicePage.openMenuItem(menuItemName);
});

Then('the user should see the invoice number in the list', () => {
    invoicePage.checkInvoiceNumber(pageFixture.invoiceNumber);
});