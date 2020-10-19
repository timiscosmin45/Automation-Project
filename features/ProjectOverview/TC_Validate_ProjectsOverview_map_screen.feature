@REGRESSION
Feature: Validate Projects Overview map screen

  Scenario: Validate Projects Overview map screen layout
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    And user sees the side menu bar present
    When user "clicks" "Map" button on the Project Overview screen
    Then user sees "PROJECTS OVERVIEW" as the screen title
    And user sees "Project Overview Map" screen
    And user sees the side menu bar present
    And user "sees" "Map" button on the Project Overview screen
    And user "sees" "Timeline" button on the Project Overview screen
    And user sees a search input with a filter button on Project Overview "Map" screen
    And user sees a list of LOR Projects on the Project Overview "Map" screen
    And user sees "All active projects" text as the list heading on Project Overview "Map" screen

  Scenario Outline: Validate projects list from Projects Overview map screen
    Given user sees "Project Overview Map" screen
    Then user sees <projectData> for each project on Projects Overview map screen
    Examples:
      | projectData        |
      | "project name"     |
      | "client name"      |
      | "project value"    |
      | "project location" |
      | "date label"       |

  Scenario: Validate UK map with locations from Projects Overview map screen
    Given user sees "Project Overview Map" screen
    Then user sees the UK map on Projects Overview map screen
    And user sees location markers representing the project's status

  Scenario Outline: Validate map legend from Projects Overview map screen
    Given user sees "Project Overview Map" screen
    Then user sees a legend with <status> status, its respective icon and the number of projects
    Examples:
      | status             |
      | "Early Engagement" |
      | "Bid"              |
      | "PCSA"             |
      | "Live Projects"    |

  Scenario: Validate pie chart from Projects Overview map screen
    Given user sees "Project Overview Map" screen
    Then user sees a pie chart with "Projects in total" text inside
    And user sees the total number of projects in the middle of the chart