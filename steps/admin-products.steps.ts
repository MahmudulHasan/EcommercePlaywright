import { When } from '../fixtures/fixtures';

When(
  'I create a product named {string}',
  async ({ adminProductsPage, state, createdProducts }, baseName: string) => {
    // Unique per run so parallel or repeated runs never collide on the shared demo shop.
    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const name = `${baseName} ${uniqueId}`;
    state.productName = name;
    state.productSearchTerm = uniqueId;
    createdProducts.push(name);
    await adminProductsPage.createProduct({
      name,
      description: 'Created by an automated Playwright test',
      price: '50',
      stock: '50',
      brand: 'ForgeFlex Tools',
      category: 'Hammer',
      image: 'Combination pliers',
    });
  },
);

When('I search the admin product list for the new product', async ({ adminProductsPage, state }) => {
  await adminProductsPage.search(state.productSearchTerm!, state.productName!);
});

When('I delete the new product', async ({ adminProductsPage, state }) => {
  await adminProductsPage.deleteProduct(state.productName!);
});
