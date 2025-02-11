import { Given, setDefaultTimeout, When } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixtures';
import { HomePage } from '../page-objects/HomePage';

const homePage = new HomePage(pageFixture.page);

setDefaultTimeout(60000);

Given('the user searches for {string}', (productName:string) => {
    homePage.searchProduct(productName);
});

When('the user goes to the {string} product details page', (productName:string) => {
    homePage.openProductDetailsPage(productName)
});