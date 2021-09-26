Feature: Validate GREENKART Homepage

  Background:
    Given user opens the GREENKART application

  Scenario: Validate Homepage Header
    Then user sees the application header
    And user sees the correct data displayed on the application header

  Scenario Outline: Validate Products Search results
    When user enters <product> in the search input
    Then user sees the correct results returned
    Examples:
      | product       |
      | "Brocolli"    |
      | "Water Melon" |

  Scenario: Validate No Products Search results
    When user enters "test" in the search input
    Then user sees the correct error message for no products found

  Scenario: Validate empty shopping cart
    When user oppens the shopping cart
    Then user sees the correct message for empty shopping cart
    And user sees the Checkout button "disabled"

  Scenario Outline: Validate Add products to shopping cart
    When user adds <quantity> <product> to the shopping cart
    Then user sees the shopping cart is correctly updated
    Examples:
      | product       | quantity |
      | "Cucumber"    | "1"      |
      | "Carrot"      | "10"     |
      | "Water Melon" | "100"    |

  Scenario: Validate Add multiple products to shopping cart
    When user adds "3" "Brocolli" to the shopping cart
    And user adds "5" "Carrot" to the shopping cart
    And user adds "2" "Water Melon" to the shopping cart
    Then user sees the shopping cart is correctly updated
