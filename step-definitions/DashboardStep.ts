import { Given } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixtures';

Given('the user goes to the {string} page',async function(pageName) {
    const homePage = pageFixture.page.locator(`[data-test='nav-${pageName.toLowerCase()}']`);
    await homePage.click();
    await pageFixture.page.waitForLoadState('networkidle');
});