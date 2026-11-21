import { expect, type Locator, type Page } from '@playwright/test';
import type { TestUser } from '../test-data/users';

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly pageTitle: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.submit = page.getByTestId('login-submit');
    this.pageTitle = page.getByTestId('page-title');
  }

  async goto(): Promise<void> {
    await this.page.goto('/auth/login');
  }

  async login(user: TestUser): Promise<void> {
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.submit.click();
  }

  async expectLoggedIn(user: TestUser): Promise<void> {
    await expect(this.pageTitle).toHaveText(user.landingPageTitle);
  }
}
