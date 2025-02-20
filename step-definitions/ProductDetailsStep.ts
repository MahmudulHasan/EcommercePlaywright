import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { ProductDetailsPage } from '../page-objects/ProductDetailsPage';
import { pageFixture } from '../hooks/pageFixtures';

setDefaultTimeout(60000);
let productDetailsPage: ProductDetailsPage;

When('the user adds the product to the cart', () => {
    productDetailsPage = new ProductDetailsPage(pageFixture.page);
    productDetailsPage.addToCart();
});

Then('the product should be added to the cart', ()=> {
    productDetailsPage.checkCartCount()
});