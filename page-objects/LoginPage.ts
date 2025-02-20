import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    signInbutton: Locator;
    userName: Locator;
    password: Locator;
    pageTitle: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.signInbutton = this.page.locator("[data-test='login-submit']");
        this.userName = this.page.locator("[data-test='email']");
        this.password = this.page.locator("[data-test='password']");
        this.pageTitle = this.page.locator("[data-test='page-title']");
    }

    async goTo() {
        await this.page.goto("https://practicesoftwaretesting.com/auth/login");
    }

    async validLogin(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
        if (username === "customer@practicesoftwaretesting.com" || username === "customer2@practicesoftwaretesting.com") {
            await expect(await this.pageTitle).toHaveText('My account');
        } else {
            await expect(await this.pageTitle).toHaveText('Sales over the years');
        }

    }

}
module.exports = { LoginPage };

