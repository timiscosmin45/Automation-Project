@REGRESSION
Feature: Validate Project Details remove person from role

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate remove person from role
    When user clicks the first "Live Projects" stage project card
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    When user click the first "Confirmed" role card
    And user clicks Remove from the role button
    Then user sees the person is removed from the role

