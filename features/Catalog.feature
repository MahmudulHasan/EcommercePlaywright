@smoke
Feature: Browse the catalogue
  Shoppers can search, sort and filter the product list.

  Background:
    Given I am on the shop home page

  Scenario: Search for a product that does not exist
    When I search for "Xylophone"
    Then I should be told no products were found

  Scenario Outline: Sort products by <sort option>
    When I sort the products by "<sort option>"
    Then the products should be ordered by "<sort option>"

    Examples:
      | sort option        |
      | Name (A - Z)       |
      | Name (Z - A)       |
      | Price (Low - High) |
      | Price (High - Low) |

  Scenario: Filter products by category
    When I filter by the category "Sander"
    Then every product shown should have "Sander" in its name
