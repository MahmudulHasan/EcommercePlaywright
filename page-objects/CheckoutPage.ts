import { expect, type Locator, type Page } from '@playwright/test';

export interface BillingAddress {
  street: string;
  houseNumber: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

/** The multi-step checkout wizard: cart → sign in → billing address → payment. */
export class CheckoutPage {
  readonly cartProductTitles: Locator;
  readonly proceedFromCart: Locator;
  readonly alreadyLoggedInMessage: Locator;
  readonly proceedFromSignIn: Locator;
  readonly street: Locator;
  readonly houseNumber: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly postalCode: Locator;
  readonly proceedFromAddress: Locator;
  readonly paymentMethod: Locator;
  readonly finish: Locator;
  readonly confirm: Locator;
  readonly paymentSuccessMessage: Locator;
  readonly orderConfirmation: Locator;

  constructor(page: Page) {
    this.cartProductTitles = page.getByTestId('product-title');
    this.proceedFromCart = page.getByTestId('proceed-1');
    this.alreadyLoggedInMessage = page.getByText(/you are already logged in/);
    this.proceedFromSignIn = page.getByTestId('proceed-2');
    this.street = page.getByTestId('street');
    this.houseNumber = page.getByTestId('house_number');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.country = page.getByTestId('country');
    this.postalCode = page.getByTestId('postal_code');
    this.proceedFromAddress = page.getByTestId('proceed-3');
    this.paymentMethod = page.getByTestId('payment-method');
    this.finish = page.getByTestId('finish');
    this.confirm = page.getByRole('button', { name: 'Confirm' });
    this.paymentSuccessMessage = page.getByTestId('payment-success-message');
    this.orderConfirmation = page.locator('#order-confirmation');
  }

  async expectCartToContain(productName: string): Promise<void> {
    await expect(this.cartProductTitles).toHaveText([productName]);
  }

  async proceedAsLoggedInUser(): Promise<void> {
    await this.proceedFromCart.click();
    await expect(this.alreadyLoggedInMessage).toBeVisible();
    await this.proceedFromSignIn.click();
  }

  async fillBillingAddress(address: BillingAddress): Promise<void> {
    await this.country.selectOption({ label: address.country });
    await this.postalCode.fill(address.postalCode);
    await this.houseNumber.fill(address.houseNumber);
    await this.street.fill(address.street);
    await this.city.fill(address.city);
    await this.state.fill(address.state);
    await expect(this.proceedFromAddress).toBeEnabled();
    await this.proceedFromAddress.click();
  }

  async payWith(method: string): Promise<void> {
    await this.paymentMethod.selectOption({ label: method });
    await this.finish.click();
  }

  async confirmOrder(): Promise<void> {
    await expect(this.paymentSuccessMessage).toBeVisible();
    await this.confirm.click();
  }

  /** Waits for the order confirmation and returns the invoice number it shows. */
  async readInvoiceNumber(): Promise<string> {
    // Placing the order can take a while on the shared demo backend.
    await expect(this.orderConfirmation).toContainText(/INV-\d+/, { timeout: 30_000 });
    const text = await this.orderConfirmation.innerText();
    const match = /INV-\d+/.exec(text);
    if (!match) throw new Error(`No invoice number in confirmation: "${text}"`);
    return match[0];
  }
}
