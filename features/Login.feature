@smoke
Feature: Login
  Registered users can sign in and land on the page for their role.

  Scenario Outline: Sign in as <role>
    When I log in as "<role>"
    Then I should land on the "<role>" dashboard

    Examples:
      | role      |
      | customer  |
      | customer2 |
      | admin     |
