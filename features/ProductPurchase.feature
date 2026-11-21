@regression
Feature: Purchase a product
  A signed-in customer can find a product, buy it and see the invoice.

  Scenario: Buy a product with cash on delivery
    Given I am logged in as "customer2"
    When I go to the home page
    And I search for "Court Hammer"
    Then I should see only the product "Court Hammer"
    When I open the product "Court Hammer"
    And I add the product to the cart
    Then the cart should show 1 item
    When I open the cart
    Then the cart should contain "Court Hammer"
    When I proceed to checkout as the logged in user
    And I enter the billing address:
      | street      | Mirpur 10  |
      | house number | 12         |
      | city        | Dhaka      |
      | state       | Dhaka      |
      | country     | Bangladesh |
      | postal code | 1216       |
    And I pay with "Cash on Delivery"
    Then I should see the message "Payment was successful"
    When I confirm the order
    Then I should receive an invoice number
    When I open "My invoices" from the user menu
    Then the invoice should be listed in my invoices
