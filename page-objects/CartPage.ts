import { expect, type Locator, type Page } from '@playwright/test';

/** First step of the checkout wizard: the shopping cart table. */
export class CartPage {
  readonly productTitles: Locator;
  readonly total: Locator;
  readonly emptyMessage: Locator;

  constructor(private readonly page: Page) {
    this.productTitles = page.getByTestId('product-title');
    this.total = page.getByTestId('cart-total');
    this.emptyMessage = page.getByText('The cart is empty. Nothing to display.');
  }

  rowFor(productName: string): Locator {
    return this.page
      .getByRole('row')
      .filter({ has: this.page.getByTestId('product-title').filter({ hasText: productName }) });
  }

  quantityFor(productName: string): Locator {
    return this.rowFor(productName).getByTestId('product-quantity');
  }

  linePriceFor(productName: string): Locator {
    return this.rowFor(productName).getByTestId('line-price');
  }

  async setQuantity(productName: string, quantity: number): Promise<void> {
    const input = this.quantityFor(productName);
    await input.fill(String(quantity));
    await input.blur();
    await expect(this.page.getByRole('alert').filter({ hasText: 'Product quantity updated.' })).toBeVisible();
  }

  async removeProduct(productName: string): Promise<void> {
    // The remove control has no test id or accessible name; it is the row's danger button.
    await this.rowFor(productName).locator('.btn-danger').click();
    await expect(this.page.getByRole('alert').filter({ hasText: 'Product deleted.' })).toBeVisible();
  }

  async expectLineTotal(productName: string, amount: number): Promise<void> {
    await expect(this.linePriceFor(productName)).toHaveText(formatPrice(amount));
  }

  async expectCartTotal(amount: number): Promise<void> {
    await expect(this.total).toHaveText(formatPrice(amount));
  }
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
