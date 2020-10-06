@REGRESSION
Feature: Validate Projects overview timeline screen

  Scenario: Validate Projects Overview timeline screen layout
    Given user opens LOR RSAR application
    Then user sees "Projects Overview" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    And user sees Project Overview "Timeline" screen
    And user sees the side menu bar present
    And user "sees" "Timeline" button on the Project Overview screen
    And user "sees" "Map" button on the Project Overview screen
    And user sees a list of LOR Projects on the Project Overview "timeline" screen
    And user sees "All active projects" text as the list heading on Project Overview "timeline" screen

  Scenario Outline: Validate timeline legend from Projects Overview timeline screen
    Given user is on the "Projects Overview timeline" screen
    Then user sees a legend with <status> status, its respective icon and the number of projects
    Examples:
      | status             |
      | "Early Engagement" |
      | "Bid"              |
      | "PCSA"             |
      | "Live Projects"    |

  Scenario Outline: Validate projects list from Projects Overview timeline screen
    Given user is on the "Projects Overview timeline" screen
    Then user sees <projectData> for each project on Projects Overview timeline screen
    Examples:
      | projectData     |
      | "project name"  |
      | "project value" |
      | "client name"   |
      | "sector icon"   |

  Scenario: Validate projects timeline section from Projects Overview timeline screen
    Given user sees the timeline section on Projects Overview timeline screen
    Then user sees the timeline for each project on timeline section
    And user sees all the months displayed on timeline section
    And user sees "left" label date as "current year" displayed on timeline section
    And user sees "right" label date as "1 year later" displayed on timeline section

  Scenario Outline: Validate the change of years on Projects Overview timeline screen
    When user clicks on the <arrow> navigation arrow on timeline section
    Then user sees "left" label date as <startDate> displayed on timeline section
    And user sees "right" label date as <endDate> displayed on timeline section
    Examples:
      | arrow   | startDate        | endDate         |
      | "left"  | "1 year earlier" | "current year"  |
      | "right" | "current year"   | "1 year later"  |
      | "right" | "1 year later"   | "2 years later" |
