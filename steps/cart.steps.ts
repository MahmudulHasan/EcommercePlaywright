import { expect } from '@playwright/test';
import { Then, When } from '../fixtures/fixtures';

When('I set the quantity to {int}', async ({ productDetailsPage }, quantity: number) => {
  await productDetailsPage.setQuantity(quantity);
});

When(
  'I change the quantity of {string} to {int} in the cart',
  async ({ cartPage }, productName: string, quantity: number) => {
    await cartPage.setQuantity(productName, quantity);
  },
);

Then(
  'the cart should charge {int} × the unit price for {string}',
  async ({ cartPage, state }, quantity: number, productName: string) => {
    expect(state.unitPrice, 'unit price read from the product page').toBeDefined();
    const expected = quantity * state.unitPrice!;
    await expect(cartPage.quantityFor(productName)).toHaveValue(String(quantity));
    await cartPage.expectLineTotal(productName, expected);
    await cartPage.expectCartTotal(expected);
  },
);

When('I remove {string} from the cart', async ({ cartPage }, productName: string) => {
  await cartPage.removeProduct(productName);
});

Then('the cart should be empty', async ({ cartPage }) => {
  await expect(cartPage.emptyMessage).toBeVisible();
  await expect(cartPage.productTitles).toHaveCount(0);
});
