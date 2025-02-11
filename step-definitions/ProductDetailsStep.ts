import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { ProductDetailsPage } from '../page-objects/ProductDetailsPage';
import { pageFixture } from '../hooks/pageFixtures';

const productDetailsPage = new ProductDetailsPage(pageFixture.page);

setDefaultTimeout(60000);

When('the user adds the product to the cart', () => {
    productDetailsPage.addToCart();
});

Then('the product should be added to the cart', async () => {
    productDetailsPage.checkCartCount()
});