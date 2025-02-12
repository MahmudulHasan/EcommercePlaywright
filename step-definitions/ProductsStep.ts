import { setDefaultTimeout, When } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixtures';
import { ProductsPage } from '../page-objects/ProductsPage';
import { getFormattedTimestamp } from '../utils/TimeStamp';

setDefaultTimeout(60000);

When('the user goes to Products page', async () => {
    const productsPage = new ProductsPage(pageFixture.page);
    productsPage.goToProductsPage();
});

When('the user creates a new product {string}', async(product:string)=>{
    const productsPage = new ProductsPage(pageFixture.page);
    const timestamp = getFormattedTimestamp();
    pageFixture.productName = `${product}_${timestamp}`;
    productsPage.createProduct(pageFixture.productName);
});

When('the user searches for Product in Products page', async () => {
    const productsPage = new ProductsPage(pageFixture.page);
    productsPage.searchProduct(pageFixture.productName);
});

When('the user deletes the product', async () => {
    const productsPage = new ProductsPage(pageFixture.page);
    productsPage.deleteProduct();
})