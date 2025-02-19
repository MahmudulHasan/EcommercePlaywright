import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixtures';
import { ProductCheckoutPage } from '../page-objects/ProductCheckoutPage';

setDefaultTimeout(60000);

When('the user proceeds to checkout for the product {string}', (productName) => {
    const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
     productCheckoutPage.proceedToCheckout(productName);
});

When('the user enters the Billing Address {string}, {string}, {string}, {string}', 
     (address, city, country, postcode) => {
        const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
        productCheckoutPage.enterBillingAddress(address, city, country, postcode);
});

When('the user selects the payment method {string}', (paymentMethod) => {
    const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
    productCheckoutPage.selectPaymentMethod(paymentMethod);
});

Then('the user should get a message {string}', (paymentSuccessMessage) => {
    const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
    productCheckoutPage.verifySuccessMessage(paymentSuccessMessage);
});

When('the user clicks confirm button',  () => {
    const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
    productCheckoutPage.confirmOrder();
});

Then('the user should get a invoice number', () => {
    const productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
     productCheckoutPage.getInvoiceNumber(pageFixture.invoiceNumber);
});
