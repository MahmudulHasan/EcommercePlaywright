import { Given, setDefaultTimeout, When } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixtures';
import { expect } from 'playwright/test';
setDefaultTimeout(60000);

Given('the user searches for {string}',async function(productName) {
    const searchBox = pageFixture.page.locator("[data-test='search-query']");
    const searchButton = pageFixture.page.locator("[data-test='search-submit']");
    const productThumbnailName = pageFixture.page.locator(".container .card-body h5");
    const searchCaption = pageFixture.page.locator("[data-test='search-caption']");
    const pagination = pageFixture.page.locator(".pagination");
    await searchBox.fill(productName);
    await searchButton.click();
    await expect(pagination).not.toBeVisible();
    await expect(searchCaption).toBeVisible();
    await expect(productThumbnailName).toHaveText(productName);
});

When('the user goes to the {string} product details page',async function(productName) {
    const productNameLocator = pageFixture.page.getByText(productName).nth(1);
    const addToCartButton = pageFixture.page.locator("[data-test='add-to-cart']");
    await productNameLocator.click();
    await expect(addToCartButton).toBeVisible();
});