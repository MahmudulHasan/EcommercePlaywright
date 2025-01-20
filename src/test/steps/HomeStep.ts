import { Given } from '@cucumber/cucumber';
import { pageFixture } from '../../hooks/pageFixtures';
import { expect } from 'playwright/test';
import { ExpectedCondition as EC } from 'expected-condition-playwright';

Given('the user searches for {string}',async function(productName) {
    const searchBox = pageFixture.page.locator("[data-test='search-query']");
    const searchButton = pageFixture.page.locator("[data-test='search-submit']");
    const productThumbnailName = pageFixture.page.locator(".container .card-body h5");
    const searchCaption = pageFixture.page.locator("[data-test='search-caption']");
    await searchBox.fill(productName);
    await searchButton.click();
    await pageFixture.page.waitForFunction(EC.elementToBeClickable(searchCaption), searchCaption, {timeout: 5000});
    await expect(searchCaption).toBeVisible();
    await expect(productThumbnailName).toHaveText(productName);
});