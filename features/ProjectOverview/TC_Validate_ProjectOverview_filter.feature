@REGRESSION
@TEST
Feature: Validate Projects Overview filter

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    When user "clicks" "Timeline" button on the Project Overview screen

  Scenario: Validate Projects Overview filter modal layout
    When user clicks filter button on Project Overview screen
    Then user "sees" a filter modal on Project Overview screen
    And user sees "PROJECTS FILTER" text as the filter modal title
    And user "sees" "Close" button on the filter modal
    And user "sees" "Apply" button on the filter modal
    And user "sees" "Clear" button on the filter modal
    When user "clicks" "Close" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen

  Scenario: Validate status filters checkboxes
    When user clicks filter button on Project Overview screen
    Then user "sees" a filter modal on Project Overview screen
    And user sees "Early Engagement" checkbox as "unchecked" on the filter modal
    And user sees "Bid" checkbox as "unchecked" on the filter modal
    And user sees "PCSA" checkbox as "unchecked" on the filter modal
    And user sees "Live" checkbox as "unchecked" on the filter modal
    When user clicks "Early Engagement" checkbox on the filter modal
    Then user sees "Early Engagement" checkbox as "checked" on the filter modal
    When user clicks "Bid" checkbox on the filter modal
    Then user sees "Bid" checkbox as "checked" on the filter modal
    When user clicks "PCSA" checkbox on the filter modal
    Then user sees "PCSA" checkbox as "checked" on the filter modal
    When user clicks "Live" checkbox on the filter modal
    Then user sees "Live" checkbox as "checked" on the filter modal
    When user "clicks" "Close" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen

  Scenario: Validate status filters checkboxes persistency
    When user clicks filter button on Project Overview screen
    Then user "sees" a filter modal on Project Overview screen
    And user sees "Early Engagement" checkbox as "checked" on the filter modal
    And user sees "Bid" checkbox as "checked" on the filter modal
    And user sees "PCSA" checkbox as "checked" on the filter modal
    And user sees "Live" checkbox as "checked" on the filter modal
    When user "clicks" "Close" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen

  Scenario Outline: Validate <status> status filter applyed on the Project list
    When user clicks filter button on Project Overview screen
    Then user "sees" a filter modal on Project Overview screen
    When user "clicks" "Clear" button on the filter modal
    Then user sees <status> status filter on the filter modal
    When user clicks <status> checkbox on the filter modal
    Then user sees <status> checkbox as "checked" on the filter modal
    When user "clicks" "Apply" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen
    And user sees only <status> projects on Project list
    Examples:
      | status        |
      | "Opportunity" |
      | "Bid"         |
      | "PCSA"        |
      | "Live"        |

# Scenario: Validate multiple status filters applyed on the Project list
#   When user clicks filter button on Project Overview screen
#   Then user "sees" a filter modal on Project Overview screen
#   And user sees "Opportunity" status filter on the filter modal
#   When user "clicks" "Clear" button on the filter modal
#   And user clicks "Opportunity" checkbox on the filter modal
#   And user clicks "Bid" checkbox on the filter modal
#   Then user sees "Opportunity" checkbox as "checked" on the filter modal
#   Then user sees "Bid" checkbox as "checked" on the filter modal
#   When user "clicks" "Apply" button on the filter modal
#   Then user "does not see" a filter modal on Project Overview screen
#   And user sees "Opportunity" projects on Project list
#   And user sees "Bid" projects on Project list
