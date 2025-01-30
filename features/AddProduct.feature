Feature: Add a new product in Ecommerce Platform
  Purchase a product from Ecommerce Platform

  Scenario: Purchase a product
    Given the user logs in to Ecommerce application with "customer@practicesoftwaretesting.com" and "welcome01"
    And the user goes to the "Home" page
    And the user searches for "Court Hammer"
    When the user goes to the "Court Hammer" product details page
    And the user adds the product to the cart
    Then the product should be added to the cart
    When the user proceeds to checkout for the product "Court Hammer"
    And the user enters the Billing Address "Mirpur", "Dhaka", "Bangladesh", "1216"
   # And the user selects the payment method "Buy Now Pay Later" and installment plan "3 Monthly Installments"
    And the user selects the payment method "Cash on Delivery"
    Then the user should get a message "Payment was successful"
    When the user clicks confirm button
    Then the user should get a invoice number
    When the user goes to My invoices page
    Then the user should see the invoice number in the list




