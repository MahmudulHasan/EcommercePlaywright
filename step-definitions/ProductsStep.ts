import { setDefaultTimeout, When } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixtures';
import { expect } from 'playwright/test';
import { ProductsPage } from '../page-objects/ProductsPage';
import { getFormattedTimestamp } from '../utils/TimeStamp';

const productsPage = new ProductsPage(pageFixture.page);
setDefaultTimeout(60000);


When('the user goes to Products page', async () => {
    productsPage.goToProductsPage();
});

When('the user creates a new product {string}', async(product)=>{
    const timestamp = getFormattedTimestamp();
    process.env.productName = `${product}_${timestamp}`;
    productsPage.createProduct(process.env.productName);
});

When('the user searches for Product in Products page', async () => {
    productsPage.searchProduct(process.env.productName);
});

When('the user deletes the product', async () => {
    productsPage.deleteProduct();
})