@regression @admin
Feature: Manage products as an admin
  An admin can add a product to the catalogue and remove it again.

  Scenario: Create a product and then delete it
    Given I am logged in as "admin"
    When I open "Products" from the user menu
    And I create a product named "PW Test Product"
    And I open "Products" from the user menu
    And I search the admin product list for the new product
    And I delete the new product
