import {Locator,Page} from '@playwright/test';

export class LoginPage {
    signInbutton : Locator;
    userName : Locator;
    password : Locator;
    page : Page;

constructor(page:Page)
{
    this.page = page;
    this.signInbutton= this.page.locator("[data-test='login-submit']");
    this.userName = this.page.locator("[data-test='email']");
    this.password = this.page.locator("[data-test='password']");

}

async goTo()
{
    await this.page.goto("https://practicesoftwaretesting.com/auth/login");
}

async validLogin(username:string,password:string)
{
    await  this.userName.fill(username);
     await this.password.fill(password);
     await this.signInbutton.click();
     await this.page.waitForLoadState('networkidle');

}

}
module.exports = {LoginPage};

