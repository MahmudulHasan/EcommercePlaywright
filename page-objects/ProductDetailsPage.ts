import { expect, type Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly productName: Locator;
  readonly addToCartButton: Locator;
  readonly toast: Locator;

  constructor(page: Page) {
    this.productName = page.getByTestId('product-name');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.toast = page.getByRole('alert');
  }

  async expectProduct(name: string): Promise<void> {
    await expect(this.productName).toHaveText(name);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await expect(this.toast).toContainText('Product added to shopping cart');
  }
}
