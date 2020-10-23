@REGRESSION
Feature: Validate Project Details screen

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate navigation from PO screen to PD screen
    Given user sees a list of LOR Projects on the Project Overview "Timeline" screen
    When user clicks on the "QUASI NEQUE LIBERO" project card
    Then user sees "Project Details" screen
    And user sees "PROJECTS DETAILS" as the screen title
    And user sees "QUASI NEQUE LIBERO" as the project name

  Scenario: Validate navigation from PD screen to PO screen
    Given user sees "Project Details" screen
    And user "sees" the "Project overview" breadcrumb
    And user "sees" the "Project details" breadcrumb
    And user sees the Project Details breadcrumb highlighted
    When user "clicks" the "Project Overview" breadcrumb
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate navigation using browser back button
    Given user sees a list of LOR Projects on the Project Overview "Timeline" screen
    When user clicks on the "QUASI NEQUE LIBERO" project card
    Then user sees "Project Details" screen
    When user clicks browser back button
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario Outline: Validate Project Stage key dates
    Given user sees "Project Details" screen
    Then user sees Project Stage section title on Project Details screen
    And user sees "Early Engagement" card highlighted
    And user sees <projectStage> card containing the status icon, name and key dates
    Examples:
      | projectStage       |
      | "Early Engagement" |
      | "Bid"              |
      | "PCSA"             |
      | "Live"             |

