import { expect, type Locator, type Page } from '@playwright/test';

export interface NewProduct {
  name: string;
  description: string;
  price: string;
  stock: string;
  brand: string;
  category: string;
  image: string;
}

export class AdminProductsPage {
  readonly addProductButton: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly stock: Locator;
  readonly brand: Locator;
  readonly category: Locator;
  readonly image: Locator;
  readonly save: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly rows: Locator;

  constructor(private readonly page: Page) {
    this.addProductButton = page.getByTestId('product-add');
    this.name = page.getByTestId('name');
    this.description = page.getByTestId('description');
    this.price = page.getByTestId('price');
    this.stock = page.getByTestId('stock');
    this.brand = page.getByTestId('brand-id');
    this.category = page.getByTestId('category-id');
    this.image = page.getByTestId('product-image-id');
    this.save = page.getByTestId('product-submit');
    this.searchBox = page.getByTestId('product-search-query');
    this.searchButton = page.getByTestId('product-search-submit');
    this.rows = page.getByRole('table').getByRole('row');
  }

  async goto(): Promise<void> {
    await this.page.goto('/admin/products');
  }

  async createProduct(product: NewProduct): Promise<void> {
    await this.addProductButton.click();
    await this.name.fill(product.name);
    await this.description.fill(product.description);
    await this.stock.fill(product.stock);
    await this.price.fill(product.price);
    await this.brand.selectOption({ label: product.brand });
    await this.category.selectOption({ label: product.category });
    await this.image.selectOption({ label: product.image });
    await this.save.click();
    await expect(this.page.getByRole('alert').filter({ hasText: 'Product saved!' })).toBeVisible();
  }

  rowFor(productName: string): Locator {
    return this.rows.filter({ hasText: productName });
  }

  /**
   * The site's full-text search is unreliable for multi-word queries, so search by a
   * single distinctive term and then pick the row by its full name.
   */
  async search(term: string, expectedProductName: string): Promise<void> {
    await this.searchBox.fill(term);
    await this.searchButton.click();
    await expect(this.rowFor(expectedProductName)).toBeVisible();
  }

  async deleteProduct(productName: string): Promise<void> {
    await this.rowFor(productName).getByRole('button', { name: /delete/i }).click();
    await expect(this.page.getByRole('alert').filter({ hasText: 'Product deleted.' })).toBeVisible();
    await expect(this.rowFor(productName)).toHaveCount(0);
  }
}
