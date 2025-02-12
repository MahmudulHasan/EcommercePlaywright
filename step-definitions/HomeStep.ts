import { Given, setDefaultTimeout, When } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixtures';
import { HomePage } from '../page-objects/HomePage';

setDefaultTimeout(60000);

Given('the user searches for {string}', (productName:string) => {
    const homePage = new HomePage(pageFixture.page);
    homePage.searchProduct(productName);
});

When('the user goes to the {string} product details page', (productName:string) => {
    const homePage = new HomePage(pageFixture.page);
    homePage.openProductDetailsPage(productName)
});