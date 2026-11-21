import { expect } from '@playwright/test';
import { Given, Then, When } from '../fixtures/fixtures';

Given('I am on the shop home page', async ({ homePage }) => {
  await homePage.goto();
});

Then('I should be told no products were found', async ({ homePage }) => {
  await homePage.expectNoResults();
});

When('I sort the products by {string}', async ({ homePage }, option: string) => {
  await homePage.sortBy(option);
});

const byName = (a: string, b: string) => a.localeCompare(b, 'en', { sensitivity: 'base' });
const byNumber = (a: number, b: number) => a - b;

Then('the products should be ordered by {string}', async ({ homePage }, option: string) => {
  switch (option) {
    case 'Name (A - Z)':
      return homePage.expectProductNames((names) => expect(names).toEqual([...names].sort(byName)));
    case 'Name (Z - A)':
      return homePage.expectProductNames((names) => expect(names).toEqual([...names].sort(byName).reverse()));
    case 'Price (Low - High)':
      return homePage.expectProductPrices((prices) => expect(prices).toEqual([...prices].sort(byNumber)));
    case 'Price (High - Low)':
      return homePage.expectProductPrices((prices) => expect(prices).toEqual([...prices].sort(byNumber).reverse()));
    default:
      throw new Error(`No ordering check defined for sort option "${option}"`);
  }
});

When('I filter by the category {string}', async ({ homePage }, category: string) => {
  await homePage.filterByCategory(category);
});

Then('every product shown should have {string} in its name', async ({ homePage }, word: string) => {
  await homePage.expectProductNames((names) => {
    for (const name of names) expect(name).toContain(word);
  });
});
