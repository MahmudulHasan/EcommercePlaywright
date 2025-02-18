import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    searchBox: Locator;
    searchButton: Locator;
    productThumbnailName: Locator;
    searchCaption: Locator;
    pagination: Locator;
    addToCartButton: Locator;
    page: Page;

    constructor(page:Page) {
        this.page = page;
        this.searchBox = this.page.locator("[data-test='search-query']");
        this.searchButton = this.page.locator("[data-test='search-submit']");
        this.productThumbnailName = this.page.locator(".container .card-body h5");
        this.searchCaption = this.page.locator("[data-test='search-caption']");
        this.pagination = this.page.locator(".pagination"); // Fixed typo
        this.addToCartButton = this.page.locator("[data-test='add-to-cart']");
    }

    async searchProduct(productName: string): Promise<void> {
            await this.searchBox.fill(productName);
            await this.searchButton.click();
            await this.page.waitForTimeout(3000);
            await expect(this.searchCaption).toBeVisible();
            await expect(this.pagination).not.toBeVisible();
            await expect(this.productThumbnailName).toContainText(productName);
    }

    async openProductDetailsPage(productName: string): Promise<void> {
            const productNameLocator = this.page.getByText(productName).nth(1);
            await productNameLocator.click();
            await this.addToCartButton.waitFor();
            //await expect(this.addToCartButton).toBeVisible();
            await this.addToCartButton.click();
            //await expect(this.page.locator("[role='alert']")).toBeVisible();
            //await expect(this.page.locator("[role='alert']")).not.toBeVisible({ timeout: 10000 });
        }
}

module.exports = {HomePage};
