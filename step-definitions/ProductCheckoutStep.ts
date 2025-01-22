import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixtures';
import { CustomWorld } from '../utils/world';
import { time } from 'console';

setDefaultTimeout(60000);

When('the user proceeds to checkout for the product {string}', async (productName) => {
    const cartBUtton = await pageFixture.page.locator('[data-test="nav-cart"]');
    await cartBUtton.click();
    const cartItem = await pageFixture.page.locator('[data-test="product-title"]');
    await expect(cartItem).toHaveText("Thor Hammer");
    const checkoutButton1 = await pageFixture.page.locator('[data-test="proceed-1"]');
    await checkoutButton1.click();
    const proceedText = await pageFixture.page.getByText('Hello Jane Doe, you are already logged in. You can proceed to checkout.');
    await expect(proceedText).toBeVisible();
    const checkoutButton2 = await pageFixture.page.locator('[data-test="proceed-2"]'); 
    await checkoutButton2.click();
});

When('the user enters the Billing Address {string}, {string}, {string}, {string}', async (address, city, country, postcode) => {
    const addressInput = await pageFixture.page.locator('[data-test="address"]');
    await addressInput.fill(address);
    const cityInput = await pageFixture.page.locator('[data-test="city"]');
    await cityInput.fill(city);
    const stateInput = await pageFixture.page.locator('[data-test="state"]');
    await stateInput.fill(city);
    const countryInput = await pageFixture.page.locator('[data-test="country"]');
    await countryInput.fill(country);
    const postcodeInput = await pageFixture.page.locator('[data-test="postcode"]');
    await postcodeInput.fill(postcode);
    const proceedButton = await pageFixture.page.locator('[data-test="proceed-3"]');
    await proceedButton.click();
});

When('the user selects the payment method {string} and installment plan {string}', async(paymentMethod, installmentPlan)=>{
    const paymentMethodInput = await pageFixture.page.locator('[data-test="payment-method"]');
    await paymentMethodInput.selectOption({label: paymentMethod});
    const installmentPlanInput = await pageFixture.page.locator('[data-test="monthly_installments"]');
    await installmentPlanInput.selectOption({label: installmentPlan});
    const paymentFinishButton = await pageFixture.page.locator('[data-test="finish"]');
    await paymentFinishButton.click();
});

Then('the user should get a message {string}', async(paymentSuccessMessage) => {
    const successMessage = await pageFixture.page.locator('.help-block');
    await console.log("Invoice Number: ", await successMessage.textContent());
    await expect(successMessage).toHaveText(paymentSuccessMessage);
});

When('the user clicks confirm button', async() => {
    const paymentFinishButton = await pageFixture.page.locator('[data-test="finish"]');
    await paymentFinishButton.click({timeout: 60000});
    await paymentFinishButton.click({timeout: 60000});
});

Then('the user should get a invoice number', async function(this: CustomWorld) {
    const invoiceNumber = await pageFixture.page.locator('[id="order-confirmation"] span');
    await expect(invoiceNumber).toBeVisible();
    console.log("Invoice Number: ", await invoiceNumber.textContent());
    this.sharedData.invoiceNumber = await invoiceNumber.textContent();
    console.log("Invoice Number: ", this.sharedData.invoiceNumber);
});