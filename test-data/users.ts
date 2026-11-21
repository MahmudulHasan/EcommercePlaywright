/**
 * Test accounts for https://practicesoftwaretesting.com.
 *
 * The defaults are the public demo accounts published by the site itself.
 * Override them with environment variables (or a local `.env` file) when
 * running against another environment. Empty values (e.g. unset CI secrets)
 * fall back to the defaults, hence `||` rather than `??`.
 */
export type UserRole = 'admin' | 'customer' | 'customer2';

export interface TestUser {
  email: string;
  password: string;
  /** Heading shown on the page the user lands on after signing in. */
  landingPageTitle: string;
}

const defaultPassword = process.env.TEST_USER_PASSWORD || 'welcome01';

export const users: Record<UserRole, TestUser> = {
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@practicesoftwaretesting.com',
    password: process.env.ADMIN_PASSWORD || defaultPassword,
    landingPageTitle: 'Sales over the years',
  },
  customer: {
    email: process.env.CUSTOMER_EMAIL || 'customer@practicesoftwaretesting.com',
    password: process.env.CUSTOMER_PASSWORD || defaultPassword,
    landingPageTitle: 'My account',
  },
  customer2: {
    email: process.env.CUSTOMER2_EMAIL || 'customer2@practicesoftwaretesting.com',
    password: process.env.CUSTOMER2_PASSWORD || defaultPassword,
    landingPageTitle: 'My account',
  },
};

export function getUser(role: string): TestUser {
  if (!(role in users)) {
    throw new Error(`Unknown user role "${role}". Known roles: ${Object.keys(users).join(', ')}`);
  }
  return users[role as UserRole];
}

export const apiBaseURL = process.env.API_BASE_URL || 'https://api.practicesoftwaretesting.com';
