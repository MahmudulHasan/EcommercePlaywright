@regression
Feature: Manage the shopping cart
  A shopper (no sign-in needed) can choose quantities, update the cart and empty it.

  Background:
    Given I am on the shop home page
    When I open the product "Combination Pliers"

  Scenario: Add several of a product at once
    When I set the quantity to 2
    And I add the product to the cart
    Then the cart should show 2 items
    When I open the cart
    Then the cart should charge 2 × the unit price for "Combination Pliers"

  Scenario: Change the quantity in the cart
    When I add the product to the cart
    And I open the cart
    And I change the quantity of "Combination Pliers" to 3 in the cart
    Then the cart should charge 3 × the unit price for "Combination Pliers"

  Scenario: Remove the only product from the cart
    When I add the product to the cart
    And I open the cart
    And I remove "Combination Pliers" from the cart
    Then the cart should be empty
