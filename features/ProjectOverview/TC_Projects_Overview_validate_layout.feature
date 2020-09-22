@REGRESSION
Feature: Validate Projects overview screen layout

  As a member of the LOR resourcing team
  I want to be taken to the most relevant screen when starting a resourcing session
  So that I can start in a logical place when making resourcing decisions

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application

  Scenario: Validate Projects overview screen layout
    Then user sees "Project overview" screen
    And user sees "Project overview" as the screen title
