import { setDefaultTimeout, When } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixtures';
import { expect } from 'playwright/test';
import { getFormattedTimestamp } from '../utils/TimeStamp'
setDefaultTimeout(60000);


When('the user goes to Products page', async () => {
    //await expect(pageFixture.page.locator('[data-test="nav-sign-in"]')).not.toBeVisible();
    const userNameLocator = pageFixture.page.locator('[data-test="nav-menu"]');
    await expect(userNameLocator).toBeVisible({timeout:5000});
    await userNameLocator.click({timeout:5000});
    const invoicePageLocator = pageFixture.page.locator('[data-test="nav-admin-products"]');
    await invoicePageLocator.click();
});

When('the user creates a new product {string}', async(product)=>{
    const timestamp = getFormattedTimestamp();
    const addProductButton = pageFixture.page.locator('[data-test="product-add"]');
    await addProductButton.click();
    const productNameInput = pageFixture.page.locator('[data-test="name"]');
    process.env.productName = product+"_"+timestamp;
    await productNameInput.fill(process.env.productName);
    const productDescriptionInput = pageFixture.page.locator('[data-test="description"]');
    const productPriceInput = pageFixture.page.locator('[data-test="price"]');
    const productStockInput = pageFixture.page.locator('[data-test="stock"]');
    const productBrandOption = pageFixture.page.locator('[data-test="brand-id"]');
    const productCategoryOption = pageFixture.page.locator('[data-test="category-id"]');
    const productImageOption = pageFixture.page.locator('[data-test="product-image-id"]');
    await productDescriptionInput.fill("This is a new product");
    await productPriceInput.fill("50");
    await productStockInput.fill("50");
    await productBrandOption.click();
    await productBrandOption.selectOption({label: "ForgeFlex Tools"});
    await productCategoryOption.click();
    await productCategoryOption.selectOption({label: "Hammer"});
    await productImageOption.click();
    await productImageOption.selectOption({label: "Combination pliers"});
    const saveButtonLocator = pageFixture.page.locator('[data-test="product-submit"]');
    await saveButtonLocator.click();
    const alert = pageFixture.page.locator('.alert');
    await expect(alert).toBeVisible();
});

When('the user searches for Product in Products page', async () => {
    const productSearchBox = pageFixture.page.locator('[data-test="product-search-query"]');
    await productSearchBox.pressSequentially(process.env.productName,{delay:300});
    const productSearchButton = pageFixture.page.locator('[data-test="product-search-submit"]');
    await productSearchButton.click();
    const productNameLocator = pageFixture.page.locator('.table tr:nth-child(1) td:nth-child(2)');
    await expect(productNameLocator).toHaveText(process.env.productName);
});

When('the user deletes the product', async () => {
    const deleteButton = pageFixture.page.locator('.table tr:nth-child(1) td:nth-child(5) button');
    await deleteButton.click();
    const deleteMessage = pageFixture.page.locator('.toast-message');
    await expect(deleteMessage).toContainText("Product deleted.");
})