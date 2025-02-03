import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { checkInvoiceNumber, openMenuItem } from '../page-objects/InvoicePage';

setDefaultTimeout(60000);

When('the user goes to {string} page', (menuItemName:string) => {
    openMenuItem(menuItemName);
});

Then('the user should see the invoice number in the list', () => {
    checkInvoiceNumber();
});