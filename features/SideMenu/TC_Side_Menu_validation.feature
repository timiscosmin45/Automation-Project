@REGRESSION
Feature: Validate Side Menu

  Scenario: Open LOR RSAR application and view side bar
    Given user opens LOR RSAR application
    Then user sees "Projects Overview" screen
    And user sees the side menu bar present
    And user sees "Project overview" option marked in yellow

  Scenario: Select Project Overview
    When user clicks on "Project Overview" option from side menu
    Then user sees "Project overview" screen
    And user sees "Project overview" as the screen title
    And user sees the side menu bar present
    And user sees "Project overview" option marked in yellow

  Scenario: Select Unassigned People
    When user clicks on "Unassigned People" option from side menu
    Then user sees "Unassigned People" screen
    And user sees "Unassigned People" as the screen title
    And user sees the side menu bar present
    And user sees "Unassigned People" option marked in yellow

  Scenario: Select Unassigned Roles
    When user clicks on "Unassigned Roles" option from side menu
    Then user sees "Unassigned Roles" screen
    And user sees "Unassigned Roles" as the screen title
    And user sees the side menu bar present
    And user sees "Unassigned Roles" option marked in yellow
