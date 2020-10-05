@REGRESSION
Feature: Validate Projects overview map screen

  Scenario: Validate Projects Overview map screen layout
    Given user opens LOR RSAR application
    Then user sees "Project Overview" screen
    When user "clicks" "Map" button on the Project Overview screen
    Then user sees "PROJECTS OVERVIEW" as the screen title
    And user sees the side menu bar present
    And user "sees" "Timeline" button on the Project Overview screen
    And user sees a list of LOR Projects on the Project Overview "map" screen
    And user sees "All active projects" text as the list heading on Project Overview "map" screen

  Scenario Outline: Validate projects list from Projects Overview map screen
    Given user is on the "Projects Overview map" screen
    Then user sees <projectData> for each project on Projects Overview map screen
    Examples:
      | projectData        |
      | "project name"     |
      | "client name"      |
      | "project value"    |
      | "project location" |
      | "date label"       |

