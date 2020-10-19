@REGRESSION
Feature: Validate Projects Overview filter

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    When user "clicks" "Timeline" button on the Project Overview screen

  Scenario: Validate Projects Overview filter modal layout
    When user clicks filter button on Project Overview "Timeline" screen
    Then user "sees" a filter modal on Project Overview screen
    And user sees "PROJECTS FILTER" text as the filter modal title
    And user "sees" "Close" button on the filter modal
    And user "sees" "Apply" button on the filter modal
    And user "sees" "Clear" button on the filter modal
    When user "clicks" "Close" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen

  Scenario: Validate status filters checkboxes
    When user clicks filter button on Project Overview "Timeline" screen
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
    When user clicks filter button on Project Overview "Timeline" screen
    Then user "sees" a filter modal on Project Overview screen
    And user sees "Early Engagement" checkbox as "checked" on the filter modal
    And user sees "Bid" checkbox as "checked" on the filter modal
    And user sees "PCSA" checkbox as "checked" on the filter modal
    And user sees "Live" checkbox as "checked" on the filter modal
    When user "clicks" "Close" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen

  Scenario Outline: Validate <status> status filter
    When user clicks filter button on Project Overview "Timeline" screen
    Then user "sees" a filter modal on Project Overview screen
    When user "clicks" "Clear" button on the filter modal
    And user clicks <status> checkbox on the filter modal
    Then user sees <status> checkbox as "checked" on the filter modal
    When user "clicks" "Apply" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen
    And user sees <status> option displayed on filter preview section
    Examples:
      | status             |
      | "Early Engagement" |
      | "Bid"              |
      | "PCSA"             |
      | "Live"             |

  Scenario: Validate multiple status filters applyed on the Project list
    When user clicks filter button on Project Overview "Timeline" screen
    Then user "sees" a filter modal on Project Overview screen
    When user "clicks" "Clear" button on the filter modal
    And user clicks "PCSA" checkbox on the filter modal
    And user clicks "Bid" checkbox on the filter modal
    Then user sees "PCSA" checkbox as "checked" on the filter modal
    Then user sees "Bid" checkbox as "checked" on the filter modal
    When user "clicks" "Apply" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen
    And user sees "PCSA" option displayed on filter preview section
    And user sees "Bid" option displayed on filter preview section

  Scenario: Validate filter editability
    When user clicks filter button on Project Overview "Timeline" screen
    Then user "sees" a filter modal on Project Overview screen
    When user "clicks" "Clear" button on the filter modal
    And user clicks "Live" checkbox on the filter modal
    Then user sees "Live" checkbox as "checked" on the filter modal
    When user selects "Building" as an option for "Business Unit" on the filter modal
    Then user sees "Building" as the selected option for "Business Unit" on the filter modal
    When user selects "Energy" as an option for "Sector" on the filter modal
    Then user sees "Energy" as the selected option for "Sector" on the filter modal
    When user sets "Minimum" value range as "150000" on the filter modal
    Then user sees "150000" as the "Minimum" value range on the filter modal
    When user sets "Maximum" value range as "500000" on the filter modal
    Then user sees "500000" as the "Maximum" value range on the filter modal
    When user "clicks" "Apply" button on the filter modal
    And user "does not see" a filter modal on Project Overview screen

  Scenario: Validate Clear All button
    When user clicks filter button on Project Overview "Timeline" screen
    Then user "sees" a filter modal on Project Overview screen
    And user sees "Live" checkbox as "checked" on the filter modal
    And user sees "Building" as the selected option for "Business Unit" on the filter modal
    And user sees "Energy" as the selected option for "Sector" on the filter modal
    And user sees "150000" as the "Minimum" value range on the filter modal
    And user sees "500000" as the "Maximum" value range on the filter modal
    When user "clicks" "Clear" button on the filter modal
    Then user sees "Live" checkbox as "unchecked" on the filter modal
    And user sees "Blank" as the selected option for "Business Unit" on the filter modal
    And user sees "Blank" as the selected option for "Sector" on the filter modal
    And user sees "Blank" as the "Minimum" value range on the filter modal
    And user sees "Blank" as the "Maximum" value range on the filter modal
    When user "clicks" "Close" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen

  Scenario: Validate filters after refreshing the page
    When user clicks filter button on Project Overview "Timeline" screen
    Then user "sees" a filter modal on Project Overview screen
    When user "clicks" "Clear" button on the filter modal
    And user clicks "Bid" checkbox on the filter modal
    Then user sees "Bid" checkbox as "checked" on the filter modal
    When user selects "Nuclear" as an option for "Business Unit" on the filter modal
    And user sees "Nuclear" as the selected option for "Business Unit" on the filter modal
    When user selects "Retail" as an option for "Sector" on the filter modal
    And user sees "Retail" as the selected option for "Sector" on the filter modal
    When user refreshes the page
    And user clicks filter button on Project Overview "Timeline" screen
    Then user "sees" a filter modal on Project Overview screen
    And user sees "Bid" checkbox as "unchecked" on the filter modal
    And user sees "Blank" as the selected option for "Business Unit" on the filter modal
    And user sees "Blank" as the selected option for "Sector" on the filter modal
    When user "clicks" "Close" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen

  Scenario: Validate filter preview section on Timeline view
    When user clicks filter button on Project Overview "Timeline" screen
    Then user "sees" a filter modal on Project Overview screen
    When user "clicks" "Clear" button on the filter modal
    And user clicks "PCSA" checkbox on the filter modal
    And user selects "Residential" as an option for "Business Unit" on the filter modal
    And user selects "Education" as an option for "Sector" on the filter modal
    And user sets "Minimum" value range as "150000" on the filter modal
    And user sets "Maximum" value range as "500000" on the filter modal
    And user "clicks" "Apply" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen
    And user "sees" the filter preview section on Project Overview screen
    And user sees "Residential" option displayed on filter preview section
    And user sees "Education" option displayed on filter preview section
    And user sees "£150K - £500K" option displayed on filter preview section

  Scenario: Validate filter preview section on Map view
    When user "clicks" "Map" button on the Project Overview screen
    Then user sees "Project Overview Map" screen
    When user clicks filter button on Project Overview "Map" screen
    Then user "sees" a filter modal on Project Overview screen
    When user "clicks" "Clear" button on the filter modal
    And user clicks "PCSA" checkbox on the filter modal
    And user selects "Residential" as an option for "Business Unit" on the filter modal
    And user selects "Education" as an option for "Sector" on the filter modal
    And user sets "Minimum" value range as "150000" on the filter modal
    And user sets "Maximum" value range as "500000" on the filter modal
    And user "clicks" "Apply" button on the filter modal
    Then user "does not see" a filter modal on Project Overview screen
    And user "sees" the filter preview section on Project Overview screen
    And user sees "Residential" option displayed on filter preview section
    And user sees "Education" option displayed on filter preview section
    And user sees "£150K - £500K" option displayed on filter preview section

  Scenario: Validate Remove filter button
    When user clicks Remove filter button on filter preview section
    Then user "does not see" the filter preview section on Project Overview screen
    And user sees "All active projects" text as the list heading on Project Overview "Map" screen
    When user "clicks" "Timeline" button on the Project Overview screen
    Then user sees "Project Overview Timeline" screen
    When user clicks Remove filter button on filter preview section
    And user "does not see" the filter preview section on Project Overview screen
    And user sees "All active projects" text as the list heading on Project Overview "Timeline" screen
