import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixtures';


setDefaultTimeout(60000);

When('the user proceeds to checkout for the product {string}', async (productName) => {
    const cartBUtton = await pageFixture.page.locator('[data-test="nav-cart"]');
    await cartBUtton.click();
    const cartItem = await pageFixture.page.locator('[data-test="product-title"]');
    await expect(cartItem).toHaveText("Court Hammer");
    await pageFixture.page.reload({waitUntil:'load'});
    const checkoutButton1 = await pageFixture.page.locator('[data-test="proceed-1"]');
    await checkoutButton1.click();
    const proceedText = await pageFixture.page.getByText('Hello Jane Doe, you are already logged in. You can proceed to checkout.');
    await expect(proceedText).toBeVisible();
    const checkoutButton2 = await pageFixture.page.locator('[data-test="proceed-2"]'); 
    await checkoutButton2.click();
});

When('the user enters the Billing Address {string}, {string}, {string}, {string}', async (address, city, country, postcode) => {
    //await pageFixture.page.pause();
    const addressInput = await pageFixture.page.locator('[data-test="address"]');
    await addressInput.clear();
    await addressInput.pressSequentially(address,{delay:100});
    const cityInput = await pageFixture.page.locator('[data-test="city"]');
    await cityInput.clear();
    await cityInput.pressSequentially(city,{delay:100});
    const stateInput = await pageFixture.page.locator('[data-test="state"]');
    await stateInput.clear();
    await stateInput.pressSequentially(city,{delay:100});
    const countryInput = await pageFixture.page.locator('[data-test="country"]');
    await countryInput.clear();
    await countryInput.pressSequentially(country,{delay:100});
    const postcodeInput = await pageFixture.page.locator('[data-test="postcode"]');
    await postcodeInput.clear();
    await postcodeInput.pressSequentially(postcode,{delay:100});
    const proceedButton = await pageFixture.page.locator('[data-test="proceed-3"]');
    await proceedButton.click();
});
/*
When('the user selects the payment method {string} and installment plan {string}', async(paymentMethod, installmentPlan)=>{
    const paymentMethodInput = await pageFixture.page.locator('[data-test="payment-method"]');
    await paymentMethodInput.selectOption({label: paymentMethod});
    const installmentPlanInput = await pageFixture.page.locator('[data-test="monthly_installments"]');
    await installmentPlanInput.selectOption({label: installmentPlan});
    const paymentFinishButton = pageFixture.page.locator('[data-test="finish"]');
    await paymentFinishButton.click();
}); */
When('the user selects the payment method {string}', async(paymentMethod)=>{
    const paymentMethodInput = await pageFixture.page.locator('[data-test="payment-method"]');
    await paymentMethodInput.selectOption({label: paymentMethod});
    //const installmentPlanInput = await pageFixture.page.locator('[data-test="monthly_installments"]');
    //await installmentPlanInput.selectOption({label: installmentPlan});
    const paymentFinishButton = pageFixture.page.locator('[data-test="finish"]');
    await paymentFinishButton.click();
});

Then('the user should get a message {string}', async(paymentSuccessMessage) => {
    const successMessage = await pageFixture.page.locator('.help-block');
    await expect(successMessage).toHaveText(paymentSuccessMessage);
});

When('the user clicks confirm button', async() => {
   // await pageFixture.page.waitForTimeout(3000);
    //const paymentFinishButton = await pageFixture.page.locator('[data-test="finish"]');
    //await expect(paymentFinishButton).toBeVisible();
   // await paymentFinishButton.waitFor();
   const paymentFinishButton = pageFixture.page.locator('[data-test="finish"]');
    
    //await paymentFinishButton.click({timeout: 60000});
    //await pageFixture.page.keyboard.press('Enter');
    //await pageFixture.page.pause();
    await paymentFinishButton.click();
});

Then('the user should get a invoice number', async function() {
    const invoiceNumber = await pageFixture.page.locator('[id="order-confirmation"] span');
    await invoiceNumber.waitFor();
    await expect(invoiceNumber).toBeVisible({timeout: 60000});
    console.log("Invoice Number: ", await invoiceNumber.textContent());
    process.env.invoiceNumberShared = await invoiceNumber.textContent();
    console.log("Invoice Number2: ", process.env.invoiceNumberShared);
});
