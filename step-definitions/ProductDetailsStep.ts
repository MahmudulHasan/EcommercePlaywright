import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { addToCart, checkCartCount } from '../page-objects/ProductDetailsPage';


setDefaultTimeout(60000);

When('the user adds the product to the cart', () => {
    addToCart();
});

Then('the product should be added to the cart', async () => {
    checkCartCount()
});