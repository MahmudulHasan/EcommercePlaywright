import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
    private page: Page;
    private userNameLocator: Locator;
    private invoicePageLocator: Locator;
    private addProductButton: Locator;
    private productNameInput: Locator;
    private productDescriptionInput: Locator;
    private productPriceInput: Locator;
    private productStockInput: Locator;
    private productBrandOption: Locator;
    private productCategoryOption: Locator;
    private productImageOption: Locator;
    private saveButtonLocator: Locator;
    private alert: Locator;
    private productSearchBox: Locator;
    private productSearchButton: Locator;
    private productNameLocator: Locator;
    private deleteButton: Locator;
    private deleteMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameLocator = this.page.locator('[data-test="nav-menu"]');
        this.invoicePageLocator = this.page.locator('[data-test="nav-admin-products"]');
        this.addProductButton = this.page.locator('[data-test="product-add"]');
        this.productNameInput = this.page.locator('[data-test="name"]');
        this.productDescriptionInput = this.page.locator('[data-test="description"]');
        this.productPriceInput = this.page.locator('[data-test="price"]');
        this.productStockInput = this.page.locator('[data-test="stock"]');
        this.productBrandOption = this.page.locator('[data-test="brand-id"]');
        this.productCategoryOption = this.page.locator('[data-test="category-id"]');
        this.productImageOption = this.page.locator('[data-test="product-image-id"]');
        this.saveButtonLocator = this.page.locator('[data-test="product-submit"]');
        this.alert = this.page.locator('.alert');
        this.productSearchBox = this.page.locator('[data-test="product-search-query"]');
        this.productSearchButton = this.page.locator('[data-test="product-search-submit"]');
        this.productNameLocator = this.page.locator('.table tr:nth-child(1) td:nth-child(2)');
        this.deleteButton = this.page.locator('.table tr:nth-child(1) td:nth-child(5) button');
        this.deleteMessage = this.page.locator('.toast-message');
    }

    /** Navigates to the Products page */
    async goToProductsPage(): Promise<void> {
        await expect(this.userNameLocator).toBeVisible({ timeout: 5000 });
        await this.userNameLocator.click();
        await this.invoicePageLocator.click();
    }

    async createProduct(product: string): Promise<void> {
        await this.addProductButton.click();
        await this.productNameInput.fill(product);
        await this.productDescriptionInput.fill('This is a new product');
        await this.productPriceInput.fill('50');
        await this.productStockInput.fill('50');

        await this.productBrandOption.click();
        await this.productBrandOption.selectOption({ label: 'ForgeFlex Tools' });

        await this.productCategoryOption.click();
        await this.productCategoryOption.selectOption({ label: 'Hammer' });

        await this.productImageOption.click();
        await this.productImageOption.selectOption({ label: 'Combination pliers' });

        await this.saveButtonLocator.click();
        await expect(this.alert).toBeVisible();
    }

    async searchProduct(productName: string): Promise<void> {
        await this.productSearchBox.pressSequentially(productName, { delay: 300 });
        await this.productSearchButton.click();
        await expect(this.productNameLocator).toHaveText(productName);
    }

    async deleteProduct(): Promise<void> {
        await this.deleteButton.click();
        await expect(this.deleteMessage).toContainText('Product deleted.');
    }
}
module.exports = { ProductsPage };