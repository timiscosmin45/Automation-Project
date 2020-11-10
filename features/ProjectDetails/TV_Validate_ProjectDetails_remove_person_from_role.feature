@REGRESSION
Feature: Validate Project Details - Remove person from role

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate Confirmed Candidate card selection
    When user clicks the first "Live Projects" stage project card
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    When user clicks the first "Confirmed" role card
    Then user "sees" Remove from role button on "Confirmed" card

  Scenario: Validate Confirmed Candidate card deselection
    When user clicks off the candidate card
    And user clicks the first "Confirmed" role card
    Then user "sees" Remove from role button on "Confirmed" card
    When user clicks off the candidate card
    Then user "does not see" Remove from role button on "Confirmed" card

  Scenario: Validate Remove Confirmed person from role
    When user clicks the first "Confirmed" role card
    And user clicks Remove from role button on "Confirmed" card
    Then user "does not see" Remove from role button on "Confirmed" card
    And user sees the person is removed from role


