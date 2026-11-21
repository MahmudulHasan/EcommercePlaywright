import { getUser } from '../test-data/users';
import { Given, Then, When } from '../fixtures/fixtures';

Given('I am logged in as {string}', async ({ loginPage }, role: string) => {
  const user = getUser(role);
  await loginPage.goto();
  await loginPage.login(user);
  await loginPage.expectLoggedIn(user);
});

When('I log in as {string}', async ({ loginPage }, role: string) => {
  await loginPage.goto();
  await loginPage.login(getUser(role));
});

Then('I should land on the {string} dashboard', async ({ loginPage }, role: string) => {
  await loginPage.expectLoggedIn(getUser(role));
});

When('I open {string} from the user menu', async ({ navBar }, item: string) => {
  await navBar.openUserMenuItem(item);
});

When('I go to the home page', async ({ navBar }) => {
  await navBar.home.click();
});
