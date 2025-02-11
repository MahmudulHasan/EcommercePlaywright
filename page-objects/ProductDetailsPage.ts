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

    /** Clicks the "Add to Cart" button and verifies alert visibility */
    async addToCart(): Promise<void> {
        try {
            await this.addToCartButton.waitFor(); // Ensure button is visible before clicking
            await this.addToCartButton.click();
            await expect(this.alert).toBeVisible();
        } catch (error) {
            console.error("Error adding product to cart", error);
            throw error;
        }
    }

    /** Checks if the cart count updates correctly */
    async checkCartCount(expectedCount: string = "1"): Promise<void> {
        try {
            await expect(this.alert).not.toBeVisible({ timeout: 10000 });
            await expect(this.cartCount).toHaveText(expectedCount);
        } catch (error) {
            console.error("Error verifying cart count", error);
            throw error;
        }
    }
}
module.exports = {ProductDetailsPage};