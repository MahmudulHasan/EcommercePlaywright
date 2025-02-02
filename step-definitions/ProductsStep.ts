import { When } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixtures';
import { expect } from 'playwright/test';

When('the user goes to Products page',async function(pageName) {
    const userNameLocator = await pageFixture.page.locator('[data-test="nav-menu"]');
    await userNameLocator.click();
    const invoicePageLocator = await pageFixture.page.locator('[data-test="nav-admin-products"]');
    await invoicePageLocator.click();
});

When('the user creates a new product {string}', async(product)=>{
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const addProductButton = pageFixture.page.locator('[data-test="product-add"]');
    await addProductButton.click();
    const productNameInput = pageFixture.page.locator('[data-test="name"]');
    process.env.productName = product+timestamp;
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
    await productBrandOption.selectOption({label: "ForgeFlex Tools"});
    await productCategoryOption.selectOption({label: "Hand Tools"});
    await productImageOption.selectOption({label: "Combination pliers"});
    const saveButtonLocator = pageFixture.page.locator('[data-test="product-submit"]');
    await saveButtonLocator.click();
    const alert = pageFixture.page.locator('.alert');
    await expect(alert).toBeVisible();
});