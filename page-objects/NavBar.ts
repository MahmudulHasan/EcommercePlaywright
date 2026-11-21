import type { Locator, Page } from '@playwright/test';

/** Top navigation bar, shared by every page. */
export class NavBar {
  readonly home: Locator;
  readonly cart: Locator;
  readonly cartQuantity: Locator;
  readonly userMenu: Locator;

  constructor(private readonly page: Page) {
    this.home = page.getByTestId('nav-home');
    this.cart = page.getByTestId('nav-cart');
    this.cartQuantity = page.getByTestId('cart-quantity');
    this.userMenu = page.getByTestId('nav-menu');
  }

  /** Opens an item from the signed-in user's dropdown, e.g. "My invoices" or "Products". */
  async openUserMenuItem(name: string): Promise<void> {
    await this.userMenu.click();
    await this.page.getByRole('link', { name, exact: true }).click();
  }
}
