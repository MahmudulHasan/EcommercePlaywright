import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly searchCaption: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortSelect: Locator;
  readonly noResults: Locator;

  constructor(private readonly page: Page) {
    this.searchBox = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
    this.searchCaption = page.getByTestId('search-caption');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
    this.sortSelect = page.getByTestId('sort');
    this.noResults = page.getByTestId('no-results');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.productNames.first()).toBeVisible();
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

  async expectNoResults(): Promise<void> {
    await expect(this.noResults).toHaveText('There are no products found.');
    await expect(this.productNames).toHaveCount(0);
  }

  async sortBy(option: string): Promise<void> {
    await this.sortSelect.selectOption({ label: option });
  }

  async filterByCategory(category: string): Promise<void> {
    await this.page.getByRole('checkbox', { name: category, exact: true }).check();
  }

  /** Retries until the grid (which re-renders asynchronously) satisfies the check. */
  async expectProductNames(check: (names: string[]) => void): Promise<void> {
    await expect(async () => {
      const names = (await this.productNames.allInnerTexts()).map((n) => n.trim());
      expect(names.length).toBeGreaterThan(0);
      check(names);
    }).toPass({ timeout: 15_000 });
  }

  async expectProductPrices(check: (prices: number[]) => void): Promise<void> {
    await expect(async () => {
      const prices = (await this.productPrices.allInnerTexts()).map((p) => Number(p.replace(/[^0-9.]/g, '')));
      expect(prices.length).toBeGreaterThan(0);
      check(prices);
    }).toPass({ timeout: 15_000 });
  }

  async openProduct(name: string): Promise<void> {
    await this.productNames.filter({ hasText: name }).click();
  }
}
