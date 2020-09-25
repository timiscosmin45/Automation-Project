@REGRESSION
Feature: Validate Projects overview screen

  Scenario: Validate Projects Overview screen layout
    Given user opens LOR RSAR application
    Then user sees "Project Overview" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate Projects Overview timeline screen
    When user "clicks" "Timeline" button on the Project Overview screen
    Then user sees "PROJECTS OVERVIEW" as the screen title
    And user sees a list of LOR Projects on the Project Overview screen

  Scenario Outline: Validate projects list from Projects Overview timeline screen
    Then user sees <projectData> for each project on Projects Overview timeline screen
    Examples:
      | projectData     |
      | "project name"  |
      | "project value" |
      | "client name"   |
      | "sector icon"   |