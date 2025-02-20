import { Page, Locator, expect } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixtures';

export class ProductCheckoutPage {
    private page: Page;
    private cartButton: Locator;
    private cartItem: Locator;
    private checkoutButton1: Locator;
    private proceedText: Locator;
    private checkoutButton2: Locator;
    private addressInput: Locator;
    private cityInput: Locator;
    private stateInput: Locator;
    private countryInput: Locator;
    private postcodeInput: Locator;
    private proceedButton: Locator;
    private paymentMethodInput: Locator;
    private paymentFinishButton: Locator;
    private successMessage: Locator;
    private invoiceNumberLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartButton = page.locator('[data-test="nav-cart"]');
        this.cartItem = page.locator('[data-test="product-title"]');
        this.checkoutButton1 = page.locator('[data-test="proceed-1"]');
        this.proceedText = page.getByText('Hello Jane Doe, you are already logged in. You can proceed to checkout.');
        this.checkoutButton2 = page.locator('[data-test="proceed-2"]');
        this.addressInput = page.locator('[data-test="address"]');
        this.cityInput = page.locator('[data-test="city"]');
        this.stateInput = page.locator('[data-test="state"]');
        this.countryInput = page.locator('[data-test="country"]');
        this.postcodeInput = page.locator('[data-test="postcode"]');
        this.proceedButton = page.locator('[data-test="proceed-3"]');
        this.paymentMethodInput = page.locator('[data-test="payment-method"]');
        this.paymentFinishButton = page.locator('[data-test="finish"]');
        this.successMessage = page.locator('.help-block');
        this.invoiceNumberLocator = page.locator('[id="order-confirmation"] span');
    }

    async proceedToCheckout(productName: string): Promise<void> {
        await this.cartButton.click();
        await expect(this.cartItem).toHaveText(productName);
        await this.page.reload({ waitUntil: 'load' });
        await this.checkoutButton1.click();
        await expect(this.proceedText).toBeVisible();
        await this.checkoutButton2.click();
    }

    async enterBillingAddress(address: string, city: string, country: string, postcode: string): Promise<void> {
        await this.addressInput.clear();
        await this.addressInput.pressSequentially(address, { delay: 100 });
        await this.cityInput.clear();
        await this.cityInput.pressSequentially(city, { delay: 100 });
        await this.stateInput.clear();
        await this.stateInput.pressSequentially(city, { delay: 100 });
        await this.countryInput.clear();
        await this.countryInput.pressSequentially(country, { delay: 100 });
        await this.postcodeInput.clear();
        await this.postcodeInput.pressSequentially(postcode, { delay: 100 });
        await this.proceedButton.click();
    }

    async selectPaymentMethod(paymentMethod: string): Promise<void> {
        await this.paymentMethodInput.selectOption({ label: paymentMethod });
        await this.paymentFinishButton.click();
    }

    async verifySuccessMessage(expectedMessage: string): Promise<void> {
        await expect(this.successMessage).toHaveText(expectedMessage);
    }

    async confirmOrder(): Promise<void> {
        await this.paymentFinishButton.click();
    }

    async getInvoiceNumber(invoiceNumber: string): Promise<void> {
        await this.invoiceNumberLocator.waitFor();
        await expect(this.invoiceNumberLocator).toBeVisible({ timeout: 60000 });
        const invoiceText = await this.invoiceNumberLocator.textContent();
        invoiceNumber = invoiceText ?? '';
        console.log("Invoice Number: ", invoiceText);
    }
}
module.exports = { ProductCheckoutPage };