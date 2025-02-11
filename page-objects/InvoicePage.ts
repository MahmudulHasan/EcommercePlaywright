import { expect, Locator, Page } from "@playwright/test";

export class InvoicePage {
    page: Page;
    userNameLocator: Locator;

    constructor(page:Page) {
        this.page = page;
        this.userNameLocator = this.page.locator('[data-test="nav-menu"]');
    }

    /** Opens a menu item based on the provided name */
    async openMenuItem(menuItemName: string): Promise<void> {
        try {
            await this.userNameLocator.waitFor(); // Ensure the menu is available
            await this.userNameLocator.click();
            const menuItemLocator = this.page.locator(`[data-test*="${menuItemName.toLowerCase()}"]`);
            await menuItemLocator.waitFor(); // Ensure menu item is visible before clicking
            await menuItemLocator.click();
        } catch (error) {
            console.error(`Error opening menu item: ${menuItemName}`, error);
            throw error;
        }
    }

    /** Checks if the invoice number matches the expected value */
    async checkInvoiceNumber(): Promise<void> {
        try {
            const invoiceNumberLocator = this.page.locator("table tbody td").first();
            await invoiceNumberLocator.waitFor();

            // Ensure the environment variable is set
            const expectedInvoiceNumber = process.env.invoiceNumberShared;
            if (!expectedInvoiceNumber) {
                throw new Error("Environment variable 'invoiceNumberShared' is not set!");
            }

            await expect(invoiceNumberLocator).toHaveText(expectedInvoiceNumber);
        } catch (error) {
            console.error("Error checking invoice number", error);
            throw error;
        }
    }
}
module.exports = {InvoicePage};
