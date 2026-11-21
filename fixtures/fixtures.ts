import { test as base, createBdd } from 'playwright-bdd';
import { AdminProductsPage } from '../page-objects/AdminProductsPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';
import { HomePage } from '../page-objects/HomePage';
import { InvoicesPage } from '../page-objects/InvoicesPage';
import { LoginPage } from '../page-objects/LoginPage';
import { NavBar } from '../page-objects/NavBar';
import { ProductDetailsPage } from '../page-objects/ProductDetailsPage';
import { apiBaseURL, users } from '../test-data/users';

/** Values shared between the steps of one scenario. A fresh object per scenario. */
export interface ScenarioState {
  productName?: string;
  /** Unique single-word term that finds `productName` with the site's search. */
  productSearchTerm?: string;
  invoiceNumber?: string;
}

interface Fixtures {
  state: ScenarioState;
  /** Names of products created by the scenario; deleted through the API afterwards if still present. */
  createdProducts: string[];
  navBar: NavBar;
  loginPage: LoginPage;
  homePage: HomePage;
  productDetailsPage: ProductDetailsPage;
  checkoutPage: CheckoutPage;
  invoicesPage: InvoicesPage;
  adminProductsPage: AdminProductsPage;
}

export const test = base.extend<Fixtures>({
  state: async ({}, use) => {
    await use({});
  },

  createdProducts: async ({ playwright }, use) => {
    const created: string[] = [];
    await use(created);
    if (created.length === 0) return;

    // Teardown: remove anything the scenario created but did not delete (e.g. it failed half-way),
    // so the shared demo shop is not littered with test data.
    const api = await playwright.request.newContext({ baseURL: apiBaseURL });
    try {
      const login = await api.post('/users/login', {
        data: { email: users.admin.email, password: users.admin.password },
      });
      const { access_token: token } = (await login.json()) as { access_token: string };
      for (const name of created) {
        // Search by the unique last word; the site's search mishandles multi-word queries.
        const res = await api.get('/products/search', { params: { q: name.split(' ').pop()! } });
        const { data } = (await res.json()) as { data: { id: string; name: string }[] };
        for (const product of data.filter((p) => p.name === name)) {
          await api.delete(`/products/${product.id}`, { headers: { Authorization: `Bearer ${token}` } });
        }
      }
    } finally {
      await api.dispose();
    }
  },

  navBar: async ({ page }, use) => use(new NavBar(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  productDetailsPage: async ({ page }, use) => use(new ProductDetailsPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  invoicesPage: async ({ page }, use) => use(new InvoicesPage(page)),
  adminProductsPage: async ({ page }, use) => use(new AdminProductsPage(page)),
});

export const { Given, When, Then, Before, After } = createBdd(test);
