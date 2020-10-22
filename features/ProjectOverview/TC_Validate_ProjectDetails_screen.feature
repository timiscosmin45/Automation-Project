@REGRESSION
Feature: Validate Project Details screen

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate navigation from Project Overview timeline screen to Project Details screen
    When user clicks project with "Project" name as "ET ASPERNATUR CONSECTETUR" on Project Overview "Timeline" screen
    Then user sees "Project Details" screen
    And user sees "PROJECTS DETAILS" as the screen title
    And user sees the side menu bar present

  Scenario: Validate navigation from Project Details screen to Project Overview timeline screen
    When user "clicks" "Project Overview" breadcrumb
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    And user sees the side menu bar present

  Scenario: Validate navigation using browser back button from Project Details to Project Overview timeline screen
    When user clicks project with "Project" name as "ET ASPERNATUR CONSECTETUR" on Project Overview "Timeline" screen
    Then user sees "Project Details" screen
    And user sees "PROJECTS DETAILS" as the screen title
    And user sees the side menu bar present
    When user clicks browser back button
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    And user sees the side menu bar present

  Scenario: Validate navigation from Project Overview map screen to Project Details screen
    When user "clicks" "Map" button on the Project Overview screen
    And user clicks project with "Project" name as "ET ASPERNATUR CONSECTETUR" on Project Overview "Map" screen
    Then user sees "Project Details" screen
    And user sees "PROJECTS DETAILS" as the screen title
    And user sees the side menu bar present

  Scenario: Validate navigation from Project Details screen to Project Overview map screen
    When user "clicks" "Project Overview" breadcrumb
    Then user sees "Project Overview Map" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    And user sees the side menu bar present

  Scenario: Validate navigation using browser back button from Project Details to Project Overview map screen
    And user clicks project with "Project" name as "ET ASPERNATUR CONSECTETUR" on Project Overview "Map" screen
    Then user sees "Project Details" screen
    And user sees "PROJECTS DETAILS" as the screen title
    And user sees the side menu bar present
    When user clicks browser back button
    Then user sees "Project Overview Map" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    And user sees the side menu bar present

  Scenario: Validate Project Details layout
    Given user sees "Project Details" screen
    Then user sees "PROJECTS DETAILS" as the screen title
    And user sees the side menu bar present
    And user "sees" "Project Overview" breadcrumb
    And user "sees" "Project Details" breadcrumb
    And user sees the Project Details breadcrumb highlighted
    And user sees "ET ASPERNATUR CONSECTETUR" as the project name

  Scenario Outline:: Validate Project Details info
    Given user sees "Project Details" screen
    Then user sees <projectData> on Projects Details screen
    Examples:
      | projectData    |
      | "project name" |
      | "client name"  |
      | "status"       |
      | "sector"       |
      | "value"        |
      | "location"     |
