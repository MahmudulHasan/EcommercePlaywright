import { expect, type Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly productName: Locator;
  readonly addToCartButton: Locator;
  readonly toast: Locator;
  readonly unitPrice: Locator;
  readonly quantity: Locator;

  constructor(page: Page) {
    this.productName = page.getByTestId('product-name');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.toast = page.getByRole('alert');
    this.unitPrice = page.getByTestId('unit-price');
    this.quantity = page.getByTestId('quantity');
  }

  async expectProduct(name: string): Promise<void> {
    await expect(this.productName).toHaveText(name);
  }

  async readUnitPrice(): Promise<number> {
    await expect(this.unitPrice).toHaveText(/\d/);
    return Number(await this.unitPrice.innerText());
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.quantity.fill(String(quantity));
    await expect(this.quantity).toHaveValue(String(quantity));
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await expect(this.toast.filter({ hasText: 'Product added to shopping cart' })).toBeVisible();
  }
}
