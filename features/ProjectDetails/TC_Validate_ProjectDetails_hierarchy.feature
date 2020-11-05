@REGRESSION
Feature: Validate Project Details hierarchy

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate Opportunity projects team roles
    When user clicks the first "Opportunity" stage project card
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees the Project team roles for "Opportunity" stage

  Scenario: Validate Bid projects team roles
    When user "clicks" "Project Overview" breadcrumb
    Then user sees "Project Overview Timeline" screen
    When user clicks the first "Bid" stage project card
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees the Project team roles for "Bid" stage

  Scenario: Validate PCSA projects team roles
    When user "clicks" "Project Overview" breadcrumb
    Then user sees "Project Overview Timeline" screen
    When user clicks the first "PCSA" stage project card
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees the Project team roles for "PCSA" stage

  Scenario: Validate Live projects team roles
    When user "clicks" "Project Overview" breadcrumb
    Then user sees "Project Overview Timeline" screen
    When user clicks the first "Live Projects" stage project card
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    And user sees the Project team roles for "Live Projects" stage
