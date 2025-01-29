// fixtures.ts
import { test as baseTest } from '@playwright/test';

// Define a fixture for shared data
export const test = baseTest.extend<{ invoiceNumberShared: string }>({
  invoiceNumberShared: 'Hello, Playwright!', // Default value
});

export { expect } from '@playwright/test';