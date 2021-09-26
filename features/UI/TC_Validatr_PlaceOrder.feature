Feature: Validate GREENKART Place Order

  Background:
    Given user opens the GREENKART application

  Scenario: Validate Place Order without agreeing the Terms & Conditions
    When user proceeds to checkout "3" "Brocolli"
    And user places the selected order
    And user sends the order with selected country as "Romania"
    Then user sees an alert error message

  Scenario: Validate Place Order for a single product
    When user proceeds to checkout "3" "Brocolli"
    And user places the selected order
    And user agrees with the Terms & Conditions
    And user sends the order with selected country as "Austria"
    Then user sees the order successfully placed

  Scenario: Validate Place Order for multimpe products
    When user adds "1" "Brocolli" to the shopping cart
    And user adds "5" "Water Melon" to the shopping cart
    And user adds "10" "Tomato" to the shopping cart
    And user clicks Proceed To checkout button
    And user places the selected order
    And user agrees with the Terms & Conditions
    And user sends the order with selected country as "France"
    Then user sees the order successfully placed