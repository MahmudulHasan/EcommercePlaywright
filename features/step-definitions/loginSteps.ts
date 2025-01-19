import { Given } from '@cucumber/cucumber';
import { LoginPage } from '../../src/test/page-objects/LoginPage';

Given('the user logs in to Ecommerce application with {string} and {string}',async function(username, password) {
    console.log('User logs in to Ecommerce application');
    const page = this.page;
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});