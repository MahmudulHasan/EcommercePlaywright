import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixtures';
import { ProductCheckoutPage } from '../page-objects/ProductCheckoutPage';

setDefaultTimeout(60000);

When('the user proceeds to checkout for the product {string}', async (productName) => {
    const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
    await productCheckoutPage.proceedToCheckout(productName);
});

When('the user enters the Billing Address {string}, {string}, {string}, {string}', 
    async (address, city, country, postcode) => {
        const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
        await productCheckoutPage.enterBillingAddress(address, city, country, postcode);
});

When('the user selects the payment method {string}', async (paymentMethod) => {
    const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
    await productCheckoutPage.selectPaymentMethod(paymentMethod);
});

Then('the user should get a message {string}', async (paymentSuccessMessage) => {
    const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
    await productCheckoutPage.verifySuccessMessage(paymentSuccessMessage);
});

When('the user clicks confirm button', async () => {
    const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
    await productCheckoutPage.confirmOrder();
});

Then('the user should get an invoice number', async function () {
    const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
    await productCheckoutPage.getInvoiceNumber();
});
