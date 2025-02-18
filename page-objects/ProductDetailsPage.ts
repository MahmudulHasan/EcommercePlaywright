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
/*
    async addToCart(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.locator("[data-test='add-to-cart']").click();
    await this.page.waitForTimeout(3000);
    await this.page.waitForSelector(
        "[role='alert']",
        { state: "visible" }
      );
    //await this.alert.waitFor({ state: 'visible', timeout: 5000 });
    await expect(this.alert).toBeVisible();
    }
*/
    async checkCartCount(): Promise<void> {
        await expect(this.alert).not.toBeVisible({ timeout: 10000 });
       // await expect(this.cartCount).toHaveText("1");
    }
}
module.exports = { ProductDetailsPage };