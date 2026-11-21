@smoke
Feature: Contact form
  The contact form tells the visitor which required fields are missing.

  Scenario: Send the contact form empty
    Given I am on the contact page
    When I send the contact form without filling it in
    Then the contact form should show these errors:
      | field      | message                 |
      | first-name | First name is required  |
      | last-name  | Last name is required   |
      | email      | Email is required       |
      | subject    | Subject is required     |
      | message    | Message is required     |
