import { expect } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixtures';

const addToCartButton = pageFixture.page.locator("[data-test='add-to-cart']");
const alert = await pageFixture.page.locator("[role='alert']");
const cartCount = await pageFixture.page.locator('[data-test="cart-quantity"]');

export async function addToCart(): Promise<void> {
    await addToCartButton.click();
    await expect(alert).toBeVisible();
}

export async function checkCartCount(): Promise<void> {
    await expect(alert).not.toBeVisible({timeout:10000});
    await expect(cartCount).toHaveText('1');
}