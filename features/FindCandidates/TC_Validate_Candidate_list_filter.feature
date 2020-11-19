@REGRESSION
Feature: Validate Candidate list filter

  Scenario: Open LOR RSAR application and navigate to Find candidates page
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Navigate to Find Candidates screen
    When user selects the first project that has an unassigned role from Timeline view
    Then user sees "Project Details" screen
    And user sees "PROJECTS DETAILS" as the screen title
    When user clicks Find candidates button from the first unassigned role card
    Then user sees "Find Candidates" screen
    And user sees "FIND CANDIDATES" as the screen title
    And user sees the side menu bar present

  Scenario Outline: Validate Candidates filter modal layout
    Given user sees "Find Candidates" screen
    And user sees "FIND CANDIDATES" as the screen title
    When user clicks filter button on Find Candidates screen
    Then user "sees" the filter modal opened on Find Candidates screen
    And user sees "FILTER CANDIDATES" as the title of candidate list filter modal
    And user "sees" "Apply" button on candidate list filter modal
    And user "sees" "Clear" button on candidate list filter modal
    And user "sees" "Close" button on candidate list filter modal
    And user sees <filterOption> label on candidate list filter modal
    Examples:
      | filterOption          |
      | "Demobilisation date" |
      | "Minimum grade"       |
      | "Job role"            |
      | "Location (region)"   |

  Scenario: Validate Candidates filter close button
    When user "clicks" "Close" button on candidate list filter modal
    Then user "does not see" the filter modal opened on Find Candidates screen

  Scenario: Validate Candidates filter Apply button
    When user clicks filter button on Find Candidates screen
    Then user "sees" the filter modal opened on Find Candidates screen
    When user sets minimum grade to "5" on candidate list filter modal
    And user selects "Principle Engineer" as an option for "Job role" on candidate list filter modal
    And user selects "London" as an option for "Location" on candidate list filter modal
    And user "clicks" "Apply" button on candidate list filter modal
    Then user "does not see" the filter modal opened on Find Candidates screen

  Scenario Outline: Validate filter preview section
    Then user "sees" the filter preview section on Find Candidates screen
    And user sees "Filtered Candidates" as the title of filter preview section
    And user "sees" "Remove filter" button on filter preview of Find Candidates screen
    And user sees the number of filter results matching the number shown in filter preview section title
    And user sees <filterOption> set as filter option by <filterCategory> on Find Candidates screen
    Examples:
      | filterOption         | filterCategory  |
      | "Principle Engineer" | "Job role"      |
      | "Grade 5 or above"   | "Minimum grade" |
      | "London"             | "Location"      |

  Scenario: Validate Candidate filter Clear all button
    When user clicks filter button on Find Candidates screen
    Then user "sees" the filter modal opened on Find Candidates screen
    When user "clicks" "Clear" button on candidate list filter modal
    Then user "does not see" the filter modal opened on Find Candidates screen
    And user "does not see" the filter preview section on Find Candidates screen
    When user clicks filter button on Find Candidates screen
    Then user "sees" the filter modal opened on Find Candidates screen
    And user sees the minimum grade "5" checkbox unchecked
    And user sees "Blank" as the selected option for "Job role" on cadidate list filter modal
    And user sees "Blank" as the selected option for "Location" on cadidate list filter modal

  Scenario: Validate Candidate filter Close button
    When user "clicks" "Close" button on candidate list filter modal
    Then user "does not see" the filter modal opened on Find Candidates screen

