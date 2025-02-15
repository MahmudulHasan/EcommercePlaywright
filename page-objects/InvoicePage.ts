import { expect, Locator, Page } from "@playwright/test";
import { pageFixture } from "../hooks/pageFixtures";

export class InvoicePage {
    page: Page;
    userNameLocator: Locator;

    constructor(page:Page) {
        this.page = page;
        this.userNameLocator = this.page.locator('[data-test="nav-menu"]');
    }

    async openMenuItem(menuItemName: string): Promise<void> {
            await this.userNameLocator.waitFor(); 
            await this.userNameLocator.click();
            const menuItemLocator = this.page.locator(`[data-test*="${menuItemName.toLowerCase()}"]`);
            await menuItemLocator.waitFor(); 
            await menuItemLocator.click();
    }

    async checkInvoiceNumber(expectedInvoiceNumber:string): Promise<void> {
            const invoiceNumberLocator = this.page.locator("table tbody td").first();
            await invoiceNumberLocator.waitFor();
            await expect(invoiceNumberLocator).toHaveText(expectedInvoiceNumber);
    }
}
module.exports = {InvoicePage};
