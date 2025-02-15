Feature: Add a new product in Ecommerce Platform then delete it
  Add a new product in Ecommerce Platform then delete it 
  
  Scenario: Purchase a product
    Given the user logs in to Ecommerce application with "admin@practicesoftwaretesting.com" and "welcome01"
    When the user goes to Products page
    And the user creates a new product "Product"
    And the user goes to the "Home" page
    When the user goes to Products page
    And the user searches for Product in Products page
    And the user deletes the product



