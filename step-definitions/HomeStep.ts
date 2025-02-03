import { Given, setDefaultTimeout, When } from '@cucumber/cucumber';
import { openProductDetailsPage, searchProduct } from '../page-objects/HomePage';

setDefaultTimeout(60000);

Given('the user searches for {string}', (productName:string) => {
    searchProduct(productName);
});

When('the user goes to the {string} product details page', (productName:string) => {
    openProductDetailsPage(productName)
});