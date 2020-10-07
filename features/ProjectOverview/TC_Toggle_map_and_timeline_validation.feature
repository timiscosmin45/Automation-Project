@REGRESSION
Feature: Toggle between map and timeline validation

  Scenario: Validate default screen - timeline view
    Given user opens LOR RSAR application
    Then user sees "Project Overview" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    And user sees Project Overview "Timeline" screen
    And user sees toggle showing the "Timeline" option highlighted

  Scenario Outline: Validate switch between map and timeline
    When user "clicks" <screen> button on the Project Overview screen
    Then user sees "PROJECTS OVERVIEW" as the screen title
    And user sees Project Overview <screen> screen
    And user sees toggle showing the <screen> option highlighted
    Examples:
      | screen     |
      | "Map"      |
      | "Timeline" |