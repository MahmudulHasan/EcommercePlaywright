Feature: Add a new product in Ecommerce Platform
  Purchase a product from Ecommerce Platform
  
  @addproduct
  Scenario: Purchase a product
    Given the user logs in to Ecommerce application with "admin@practicesoftwaretesting.com" and "welcome01"
    When the user goes to Products page
    And the user creates a new product "Product"
    And the user goes to the "Home" page
    #And the user searches for "Product"
    When the user goes to Products page
    And the user searches for Product in Products page
    And the user deletes the product
    #And the user goes to the "Home" page
    #And the user searches for "Product"
    #Then the product should not be available



