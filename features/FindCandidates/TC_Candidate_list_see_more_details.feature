@REGRESSION
@TEST
Feature: Validate Candidate list - see more details

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Navigate to Find Candidates screen
    When user selects the first project that has an unassigned role from Timeline view
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    When user clicks Find candidates button from the first unassigned role card
    Then user sees "Find Candidates" screen
    And user sees "FIND CANDIDATES" as the screen title
    And user sees the side menu bar present
    And user sees the list of candidates on Find Candidates screen

  Scenario: Validate more details modal for candidate list
    Given user sees "Find Candidates" screen
    When user "clicks" the "See more details" button from the first card of "suitable candidates" list
    Then user sees the candidate details modal

  Scenario Outline: Validate candidate details
    Then user sees <element> on more details modal
    Examples:
      | element             |
      | "Photo"             |
      | "Name"              |
      | "Job Title"         |
      | "Grade"             |
      | "Mobility"          |
      | "Location"          |
      | "Department"        |
      | "Business Unit"     |
      | "Role"              |
      | "Unassigned Date"   |
      | "Close Button Date" |


