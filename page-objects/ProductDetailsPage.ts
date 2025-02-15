import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
    page: Page;
    addToCartButton: Locator;
    alert: Locator;
    cartCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = this.page.locator("[data-test='add-to-cart']");
        this.alert = this.page.locator("[role='alert']");
        this.cartCount = this.page.locator('[data-test="cart-quantity"]');
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.waitFor();
        await this.addToCartButton.click();
        await expect(this.alert).toBeVisible();
    }

    async checkCartCount(expectedCount: string = "1"): Promise<void> {
        await expect(this.alert).not.toBeVisible({ timeout: 10000 });
        await expect(this.cartCount).toHaveText(expectedCount);
    }
}
module.exports = { ProductDetailsPage };