@REGRESSION
Feature: Validate Project Details screen

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate navigation from Project Overview timeline screen to Project Details screen
    When user clicks project with "Project" name as "CLOUD HQ DATA CENTRE" on Project Overview "Timeline" screen
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees the side menu bar present

  Scenario: Validate navigation from Project Details screen to Project Overview timeline screen
    When user "clicks" "Project Overview" breadcrumb
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    And user sees the side menu bar present

  Scenario: Validate navigation using browser back button from Project Details to Project Overview timeline screen
    When user clicks project with "Project" name as "CLOUD HQ DATA CENTRE" on Project Overview "Timeline" screen
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees the side menu bar present
    When user clicks browser back button
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    And user sees the side menu bar present

  Scenario: Validate navigation from Project Overview map screen to Project Details screen
    When user "clicks" "Map" button on the Project Overview screen
    And user clicks project with "Project" name as "CLOUD HQ DATA CENTRE" on Project Overview "Map" screen
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees the side menu bar present

  Scenario: Validate navigation from Project Details screen to Project Overview map screen
    When user "clicks" "Project Overview" breadcrumb
    Then user sees "Project Overview Map" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    And user sees the side menu bar present

  Scenario: Validate navigation using browser back button from Project Details to Project Overview map screen
    When user clicks project with "Project" name as "CLOUD HQ DATA CENTRE" on Project Overview "Map" screen
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees the side menu bar present
    When user clicks browser back button
    Then user sees "Project Overview Map" screen
    And user sees "PROJECTS OVERVIEW" as the screen title
    And user sees the side menu bar present

  Scenario: Validate Project Details layout
    When user clicks project with "Project" name as "CLOUD HQ DATA CENTRE" on Project Overview "Map" screen
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees the side menu bar present
    And user "sees" "Project Overview" breadcrumb
    And user "sees" "Project Details" breadcrumb
    And user sees the Project Details breadcrumb highlighted
    And user sees "CLOUD HQ DATA CENTRE" as the project name

  Scenario Outline: Validate Project Details info
    Given user sees "Project Details" screen
    Then user sees <projectData> on Projects Details section
    Examples:
      | projectData    |
      | "project name" |
      | "client name"  |
      | "sector"       |
      | "value"        |
      | "location"     |

  Scenario: Validate Project Stage key dates
    When user clicks browser back button
    And user clicks the first "Live Projects" stage project card
    Then user sees "Project Details" screen
    #missing datatest-id
    #Then user sees Project Stage section title on Project Details screen
    And user sees "Live" card highlighted
    And user sees "Opportunity" card containing the stage icon, name and key dates
    And user sees "Bid" card containing the stage icon, name and key dates
    And user sees "PCSA" card containing the stage icon, name and key dates

  #missing datatest-id
  # Scenario: Validate Project Details ORG Chart legend
  #   Given user sees "Project Details" screen
  #   Then user sees ORG Chart legend on Project Details screen
  #   And user sees "Unassigned" status name on ORG Chart
  #   And user sees "Awaiting confirmation" status name on ORG Chart
  #   And user sees "Confirmed" status name on ORG Chart

  Scenario: Validate Project Stage selection
    When user selects "Opportunity" project stage
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees "Opportunity" card highlighted
    And user sees the Project team roles for "Opportunity" stage
    When user selects "PCSA" project stage
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees the Project team roles for "PCSA" stage
    And user sees "PCSA" card highlighted
    When user selects "Bid" project stage
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees the Project team roles for "Bid" stage
    And user sees "Bid" card highlighted
