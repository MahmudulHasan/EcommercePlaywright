import { expect } from '@playwright/test';
import type { DataTable } from 'playwright-bdd';
import type { BillingAddress } from '../page-objects/CheckoutPage';
import { Then, When } from '../fixtures/fixtures';

When('I search for {string}', async ({ homePage }, term: string) => {
  await homePage.search(term);
});

Then('I should see only the product {string}', async ({ homePage }, name: string) => {
  await homePage.expectOnlyProduct(name);
});

When('I open the product {string}', async ({ homePage, productDetailsPage, state }, name: string) => {
  await homePage.openProduct(name);
  await productDetailsPage.expectProduct(name);
  state.unitPrice = await productDetailsPage.readUnitPrice();
});

When('I add the product to the cart', async ({ productDetailsPage }) => {
  await productDetailsPage.addToCart();
});

Then('the cart should show {int} item(s)', async ({ navBar }, count: number) => {
  await expect(navBar.cartQuantity).toHaveText(String(count));
});

When('I open the cart', async ({ navBar }) => {
  await navBar.cart.click();
});

Then('the cart should contain {string}', async ({ checkoutPage }, name: string) => {
  await checkoutPage.expectCartToContain(name);
});

When('I proceed to checkout as the logged in user', async ({ checkoutPage }) => {
  await checkoutPage.proceedAsLoggedInUser();
});

When('I enter the billing address:', async ({ checkoutPage }, table: DataTable) => {
  const row = table.rowsHash();
  const address: BillingAddress = {
    street: row.street,
    houseNumber: row['house number'],
    city: row.city,
    state: row.state,
    country: row.country,
    postalCode: row['postal code'],
  };
  await checkoutPage.fillBillingAddress(address);
});

When('I pay with {string}', async ({ checkoutPage }, method: string) => {
  await checkoutPage.payWith(method);
});

Then('I should see the message {string}', async ({ checkoutPage }, message: string) => {
  await expect(checkoutPage.paymentSuccessMessage).toHaveText(message);
});

When('I confirm the order', async ({ checkoutPage, state }) => {
  await checkoutPage.confirmOrder();
  state.invoiceNumber = await checkoutPage.readInvoiceNumber();
});

Then('I should receive an invoice number', ({ state }) => {
  expect(state.invoiceNumber).toMatch(/^INV-\d+$/);
});

Then('the invoice should be listed in my invoices', async ({ invoicesPage, state }) => {
  expect(state.invoiceNumber, 'invoice number from the order confirmation').toBeDefined();
  await invoicesPage.expectInvoiceListed(state.invoiceNumber!);
});
