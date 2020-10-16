@REGRESSION
Feature: Validate Projects Overview filter

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

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
      | status             |
      | "Early Engagement" |
      | "Bid"              |
      | "PCSA"             |
      | "Live"             |

  Scenario: Validate multiple status filters applyed on the Project list
    When user clicks filter button on Project Overview screen
    Then user "sees" a filter modal on Project Overview screen
    And user sees "Early Engagement" status filter on the filter modal
    When user "clicks" "Clear" button on the filter modal
    And user clicks "Early Engagement" checkbox on the filter modal
    And user clicks "Bid" checkbox on the filter modal
    Then user sees "Early Engagement" checkbox as "checked" on the filter modal
    Then user sees "Bid" checkbox as "checked" on the filter modal
    When user "clicks" "Apply" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen
    And user sees "Early Engagement" projects on Project list
    And user sees "Bid" projects on Project list

  Scenario: Validate filter editability
    When user clicks filter button on Project Overview screen
    Then user "sees" a filter modal on Project Overview screen
    And user sees "Early Engagement" checkbox as "checked" on the filter modal
    And user sees "Bid" checkbox as "checked" on the filter modal
    When user user clicks "Early Engagement" checkbox on the filter modal
    And user clicks "Live" checkbox on the filter modal
    And user selects "Building" as an option for "Business Unit" on the filter modal
    And user selects "Energy" as an option for "Sector" on the filter modal
    And user sets "maximum" value range as "150000"
    And user "clicks" "Apply" button on the filter modal
    And user "does not see" a filter modal on Project Overview screen

  Scenario: Validate Clear All button
    When user clicks filter button on Project Overview screen
    Then user "sees" a filter modal on Project Overview screen
    And user sees "Bid" checkbox as "checked" on the filter modal
    And user sees "Live" checkbox as "checked" on the filter modal
    And user sees "Building" as a selected filter option on the filter modal
    And user sees "Energy" as a selected filter option on the filter modal
    And user sees "150000" as the "maximum" value range on the filter modal
    When user "clicks" "Clear" button on the filter modal
    Then user sees "Bid" checkbox as "unchecked" on the filter modal
    And user sees "Live" checkbox as "unchecked" on the filter modal
    And user sees "Business Unit" field blank on the filter modal
    And user sees "Sector" field blank on the filter modal
    And user sees "Maximum Value Range" field blank on the filter modal
    And user "clicks" "Apply" button on the filter modal
    And user "does not see" a filter modal on Project Overview screen

  Scenario: Validate filters after refreshing the page
    When user clicks filter button on Project Overview screen
    Then user "sees" a filter modal on Project Overview screen
    And user clicks "Bid" checkbox on the filter modal
    And user sees "Bid" checkbox as "checked" on the filter modal
    When user refreshes the page
    And user clicks filter button on Project Overview screen
    Then user sees "Bid" checkbox as "unchecked" on the filter modal

  Scenario: Validate filter preview section on Timeline view
    When user clicks filter button on Project Overview screen
    Then user "sees" a filter modal on Project Overview screen
    And user clicks "PCSA" checkbox on the filter modal
    And user sees "Building" as a selected filter option on the filter modal
    And user sees "Energy" as a selected filter option on the filter modal
    And user sees "150000" as the "minimum" value range on the filter modal
    And user sees "300000" as the "maximum" value range on the filter modal
    When user "clicks" "Apply" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen
    And user "sees" the filter preview section on Project Overview screen
    And user sees "Building" option displayed on filter preview section
    And user sees "Energy" option displayed on filter preview section
    And user sees "150K-300K" option displayed on filter preview section

  Scenario: Validate filter preview section on Map view
    When user user "clicks" "Map" button on the Project Overview screen
    Then user sees "Project Overview Map" screen
    And user "sees" the filter preview section on Project Overview screen
    And user sees "Building" option displayed on filter preview section
    And user sees "Energy" option displayed on filter preview section
    And user sees "150K-300K" option displayed on filter preview section

  Scenario: Validate Remove filter button
   Given user sees "Project Overview Map" screen
    When user clicks Remove filter button
    Then user "does not see" the filter preview section on Project Overview screen
    When user user "clicks" "Timeline" button on the Project Overview screen
    Then user sees "Project Overview Timeline" screen
    And user "does not see" the filter preview section on Project Overview screen