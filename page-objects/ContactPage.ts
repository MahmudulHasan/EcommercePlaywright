import type { Locator, Page } from '@playwright/test';

export class ContactPage {
  readonly submit: Locator;

  constructor(private readonly page: Page) {
    this.submit = page.getByTestId('contact-submit');
  }

  async goto(): Promise<void> {
    await this.page.goto('/contact');
  }

  /** Validation message under a field, e.g. fieldError('first-name') → data-test="first-name-error". */
  fieldError(field: string): Locator {
    return this.page.getByTestId(`${field}-error`);
  }
}
