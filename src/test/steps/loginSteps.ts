import { Given } from '@cucumber/cucumber';
import { LoginPage } from '../page-objects/LoginPage';
import { pageFixture } from '../../hooks/pageFixtures';

Given('the user logs in to Ecommerce application with {string} and {string}',{timeout:10000},async function(username, password) {
    const loginPage = new LoginPage(pageFixture.page);
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});