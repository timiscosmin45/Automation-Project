@REGRESSION

Feature: Validate Find Candidates screen

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate navigation to Find Candidates screen
    When user clicks project with "Project" name as "ET ASPERNATUR CONSECTETUR" on Project Overview "Timeline" screen
    Then user sees "Project Details" screen
    And user sees "PROJECTS DETAILS" as the screen title
    When user clicks Find Candidates button on Project Details screen
    Then user sees "Find Candidates" screen
    And user sees "FIND CANDIDATES" as the screen title
    And user sees the side menu bar present

  Scenario Outline: Validate view list title
    Then user sees the "Suitable Candidates" title
    And user sees "Planning & Project Controls Leader" as the name of the selected role
    And user sees the list of candidates on Find Candidates screen
    And user sees candidate's <data> for each candidate on Find Candidates screen
    Examples:
      | data            |
      | "name"          |
      | "job title"     |
      | "grade"         |
      | "home postcode" |