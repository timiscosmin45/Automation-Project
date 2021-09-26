Feature: Validate GREENKART Checkout Page

  Background:
    Given user opens the GREENKART application

  Scenario: Validate proceed to checkout with empty cart
    When user clicks Proceed To checkout button
    Then user sees the correct error message for empty cart

  Scenario: Validate checkout page for a single product
    When user adds "1" "Brocolli" to the shopping cart
    And user clicks Proceed To checkout button
    Then user sees the checkout page correctly updated

  Scenario: Validate checkout page for multiple products
    When user adds "1" "Brocolli" to the shopping cart
    And user adds "5" "Water Melon" to the shopping cart
    And user adds "10" "Tomato" to the shopping cart
    And user adds "1" "Brocolli" to the shopping cart
    And user clicks Proceed To checkout button
    Then user sees the checkout page correctly updated

  Scenario: Validate products checkout with invalid promo code
    When user adds "1" "Brocolli" to the shopping cart
    And user clicks Proceed To checkout button
    And user applies an "invalid" promo code
    Then user sees an error message indicating "invalid"

  Scenario: Validate products checkout with missing promo code
    When user adds "1" "Brocolli" to the shopping cart
    And user clicks Proceed To checkout button
    And user clicks on apply promo code button
    Then user sees an error message indicating "missing"
