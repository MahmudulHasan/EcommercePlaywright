@smoke
Feature: Login validation
  The login form rejects bad input and explains what went wrong.

  Background:
    Given I am on the login page

  Scenario: Sign in with an unregistered email
    When I sign in with an unregistered email and the password "welcome01"
    Then I should see the login error "Invalid email or password"
    And I should still be on the login page

  Scenario: Submit the login form empty
    When I submit the login form without credentials
    Then the login form should show these errors:
      | field    | message              |
      | email    | Email is required    |
      | password | Password is required |
