import { pageFixture } from '../hooks/pageFixtures';
import { expect } from 'playwright/test';

const searchBox = pageFixture.page.locator("[data-test='search-query']");
const searchButton = pageFixture.page.locator("[data-test='search-submit']");
const productThumbnailName = pageFixture.page.locator(".container .card-body h5");
const searchCaption = pageFixture.page.locator("[data-test='search-caption']");
const pagination = pageFixture.page.locator(".pagination");
const addToCartButton = pageFixture.page.locator("[data-test='add-to-cart']");

export async function searchProduct(productName: string): Promise<void> {
    await searchBox.fill(productName);
    await searchButton.click();
    await expect(pagination).not.toBeVisible();
    await expect(searchCaption).toBeVisible();
    await expect(productThumbnailName).toContainText(productName);
}

export async function openProductDetailsPage(productName: string): Promise<void> {
    const productNameLocator = pageFixture.page.getByText(productName).nth(1);
    await productNameLocator.click();
    await expect(addToCartButton).toBeVisible();
  }