@REGRESSION
Feature: Validate Find Candidates screen

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate navigation to Find Candidates screen
    When user selects the first project that has an unassigned role from Timeline view
    Then user sees "Project Details" screen
    And user sees "PROJECT DETAILS" as the screen title
    When user clicks Find candidates button from the first unassigned role card
    Then user sees "Find Candidates" screen
    And user sees "FIND CANDIDATES" as the screen title
    And user sees the side menu bar present

  Scenario Outline: Validate Project Details section
    Given user sees "Find Candidates" screen
    Then user sees <projectData> on Projects Details section
    Examples:
      | projectData    |
      | "project name" |
      | "client name"  |
      | "status"       |
      | "sector"       |
      | "value"        |
      | "location"     |

  Scenario: Validate Candidate list title
    Given user sees "Find Candidates" screen
    Then user sees the "Suitable Candidates" title
    And user sees "Planning & Project Controls Leader" as the name of the selected role
    And user sees the list of candidates on Find Candidates screen

  Scenario Outline: Validate Candidate list
    Given user sees "Find Candidates" screen
    And user sees candidate's <data> for each candidate on Find Candidates screen
    Examples:
      | data                  |
      | "name"                |
      | "job title"           |
      | "grade"               |
      | "home postcode"       |
      | "business unit"       |
      | "talent programme"    |
      | "key project"         |
      | "demobilisation date" |

  Scenario Outline: Validate empty shortlist
    Then user sees the empty shortlist with 4 slots
    And user sees the <pageElement> displayed as <data> on Find Candidates screen
    Examples:
      | pageElement      | data                                                                                              |
      | "title"          | "Options"                                                                                         |
      | "date and label" | "Phase starts: 19 September 2019"                                                                 |
      | "explainer text" | "Add suitable candidates to the option list in order. Place most suitable candidates at the top." |

  Scenario: Remove candidate from shortlist
    When user "clicks" the "Add to options list" button from the first card of "suitable candidates" list
    Then user sees the selected candidate added to the "first" space in the shortlist
    And user sees Reorder list buttons from the first card of the shortlist "disabled"
    And user "does not see" the candidate on candidates list
    When user "clicks" the "Remove from shortlist" button from the first card of "options" list
    Then user "sees" the candidate on candidates list

  Scenario Outline: Add candidate to empty shortlist
    Given user sees the empty shortlist with 4 slots
    When user "clicks" the "Add to options list" button from the first card of "suitable candidates" list
    Then user sees the selected candidate added to the "first" space in the shortlist
    And user sees Reorder list buttons from the first card of the shortlist "disabled"
    And user "does not see" the candidate on candidates list
    And user <action> the <label> button from the first card of <location> list
    Examples:
      | action | label                   | location  |
      | "sees" | "Remove from shortlist" | "options" |
      | "sees" | "Suggest candidate"     | "options" |

  Scenario: Add candidate to populated shortlist
    Given user sees the shortlist populated, but not full
    When user "clicks" the "Add to options list" button from the first card of "suitable candidates" list
    Then user sees the selected candidate added to the "second" space in the shortlist
    And user sees Reorder list buttons from the first card of the shortlist "enabled"
    And user "does not see" the candidate on candidates list

  Scenario Outline: Reprioritise candidates on shortlist
    Given user sees at least "2" candidates added in the shortlist
    Then user sees Reorder list "up" button disabled on the "first" card
    And user sees Reorder list "down" button disabled on the "last" card
    When user clicks on "down" reprioritise button on the "first" candidate card
    Then user sees the candidate card moved one position "down" in shortlist

  Scenario: Full shortlist validation
    When user adds canddidates until shortlist is full
    Then user sees all Add to options list buttons disabled on candidates list