import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from '../hooks/pageFixtures';
import { ProductCheckoutPage } from '../page-objects/ProductCheckoutPage';

setDefaultTimeout(60000);
let productCheckoutPage: ProductCheckoutPage;

When('the user proceeds to checkout for the product {string}', (productName) => {
    productCheckoutPage = new ProductCheckoutPage(pageFixture.page);
    productCheckoutPage.proceedToCheckout(productName);
});

When('the user enters the Billing Address {string}, {string}, {string}, {string}',
    (address, city, country, postcode) => {
        productCheckoutPage.enterBillingAddress(address, city, country, postcode);
    });

When('the user selects the payment method {string}', (paymentMethod) => {
    productCheckoutPage.selectPaymentMethod(paymentMethod);
});

Then('the user should get a message {string}', (paymentSuccessMessage) => {
    productCheckoutPage.verifySuccessMessage(paymentSuccessMessage);
});

When('the user clicks confirm button', () => {
    productCheckoutPage.confirmOrder();
});

Then('the user should get a invoice number', () => {
    productCheckoutPage.getInvoiceNumber(pageFixture.invoiceNumber);
});
