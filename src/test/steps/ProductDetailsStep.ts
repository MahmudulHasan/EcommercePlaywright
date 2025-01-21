import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';

When('the user adds the product to the cart', async () => {
    const addToCartButton = pageFixture.page.locator("[data-test='add-to-cart']");
    await addToCartButton.click();
    const alert = await pageFixture.page.locator("[role='alert']");
    await expect(alert).toBeVisible();
});

Then('the product should be added to the cart', async () => {
    const cartCount = await pageFixture.page.locator('[data-test="cart-quantity"]');
    const alert = await pageFixture.page.locator("[role='alert']");
    await expect(alert).not.toBeVisible();
    await expect(cartCount).toHaveText('1');
});