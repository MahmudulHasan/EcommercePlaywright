import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly searchCaption: Locator;
  readonly productNames: Locator;

  constructor(private readonly page: Page) {
    this.searchBox = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
    this.searchCaption = page.getByTestId('search-caption');
    this.productNames = page.getByTestId('product-name');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async search(term: string): Promise<void> {
    // The product grid loads asynchronously; searching before it has rendered
    // lets the initial (unfiltered) response overwrite the search results.
    await expect(this.productNames.first()).toBeVisible();
    await this.searchBox.fill(term);
    await this.searchButton.click();
    await expect(this.searchCaption).toHaveText(`Searched for: ${term}`);
  }

  async expectOnlyProduct(name: string): Promise<void> {
    await expect(this.productNames).toHaveText([name]);
  }

  async openProduct(name: string): Promise<void> {
    await this.productNames.filter({ hasText: name }).click();
  }
}
