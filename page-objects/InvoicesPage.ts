import { expect, type Locator, type Page } from '@playwright/test';

export class InvoicesPage {
  readonly rows: Locator;

  constructor(page: Page) {
    this.rows = page.getByRole('table').getByRole('row');
  }

  async expectInvoiceListed(invoiceNumber: string): Promise<void> {
    await expect(this.rows.filter({ hasText: invoiceNumber })).toHaveCount(1);
  }
}
