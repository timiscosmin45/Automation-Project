@REGRESSION
Feature: Validate Project Details - Confirm person to role

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate Awaiting Candidate card selection
    When user clicks the first "Live Projects" stage project card
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    When user clicks the first "Awaiting" role card
    Then user "sees" Remove from role button on "Awaiting" card
    And user "sees" "Confirm to role" button on Awaiting card
    And user "sees" "Review Candidates" button on Awaiting card

  Scenario: Validate Awaiting Candidate card deselection
    When user clicks off the candidate card
    And user clicks the first "Awaiting" role card
    Then user "sees" Remove from role button on "Awaiting" card
    And user "sees" "Confirm to role" button on Awaiting card
    And user "sees" "Review Candidates" button on Awaiting card
    When user clicks off the candidate card
    Then user "does not see" Remove from role button on "Awaiting" card
    And user "does not see" "Confirm to role" button on Awaiting card
    And user "does not see" "Review Candidates" button on Awaiting card

  Scenario: Validate Confirm Awaiting Candidate to role
    When user clicks the first "Awaiting" role card
    And user clicks "Confirme to role" button on Awaiting card
    Then user sees the person is confirmed to role

  Scenario: Validate Remove Awaiting Candidate to role
    When user clicks the first "Awaiting" role card
    And user clicks Remove from role button on "Awaiting" card
    Then user "does not see" Remove from role button on "Awaiting" card
    And user sees the person is removed from role

  Scenario: Validate Review Awaiting Candidates
    When user clicks the first "Awaiting" role card
    And user clicks "Review Candidates" button on Awaiting card
    Then user sees "Find Candidates" screen
    And user sees "FIND CANDIDATES" as the screen title
    And user sees the side menu bar present
