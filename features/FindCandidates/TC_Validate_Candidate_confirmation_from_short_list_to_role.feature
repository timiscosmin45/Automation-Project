@REGRESSION
Feature: Validate candidate confirmation from short list to role

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
    And user sees "FIND CANDIDATES" as the screen title
    And user sees the side menu bar present

  Scenario: Validate candidate confirmation from short list to role
    Given user sees at least one candidate in the shortlist
    When user clicks the "Suggest candidate" button from the first candidate card
    Then user sees Toast present with the following success message "CANDIDATE SUGGESTION MADE"
    When user waits "2" seconds
    Then user sees "Project Details" screen
    And user sees "PROJECTS DETAILS" as the screen title
    Then user sees the suggested candidate with the status Awaiting confirmation

