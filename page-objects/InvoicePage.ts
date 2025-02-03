import { pageFixture } from "../hooks/pageFixtures";
import { expect } from '@playwright/test';

const userNameLocator = await pageFixture.page.locator('[data-test="nav-menu"]');

export async function openMenuItem(menuItemName: string): Promise<void> {
    await userNameLocator.click();
    const invoicePageLocator = await pageFixture.page.locator(`[data-test*="${menuItemName.toLocaleLowerCase()}"]`);
    await invoicePageLocator.click();
}

export async function checkInvoiceNumber(): Promise<void> {
    const invoiceNumberLocator = await pageFixture.page.locator('table tbody td').first();
    await invoiceNumberLocator.waitFor();
    expect(invoiceNumberLocator).toHaveText(process.env.invoiceNumberShared);
}