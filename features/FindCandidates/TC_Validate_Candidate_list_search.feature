@REGRESSION
Feature: Validate Candidate list search

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Navigate to Find Candidates screen
    When user selects the first project that has an unassigned role from Timeline view
    Then user sees "Project Details" screen
    And user sees "PROJECTS DETAILS" as the screen title
    When user clicks Find Candidates button on Project Details screen
    Then user sees "Find Candidates" screen

  Scenario: Validate search field layout
    Given user sees "FIND CANDIDATES" as the screen title
    Then user sees the candidate list search field with "Search people by name" placeholder text
    And user "sees" the candidate list search icon

  Scenario: Validate search editability
    When user "types" "test1" in the candidate list search input
    And user presses "ENTER" key
    Then user "sees" "test1" in the candidate list search input
    When user "types" "test2" in the candidate list search input
    And user "clicks" the candidate list search icon
    Then user "sees" "test2" in the candidate list search input

  Scenario: Validate search results
    When user "types" "Tom" in the candidate list search input
    And user presses "ENTER" key
    Then user "sees" "Tom" in the candidate list search input
    And user sees only candidates with name matching "Tom"

  Scenario: No candidates matching search criteria validation
    When user "types" "candidateX" in the candidate list search input
    And user "clicks" the candidate list search icon
    Then user "sees" "candidateX" in the candidate list search input
    And user does not see any candidates displayed on Find Candidates screen
    And user "There are no matching results for this search. Consider refining your filter options." message on Find Candidates screen
