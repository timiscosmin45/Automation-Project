@REGRESSION
Feature: Validate Find Candidates screen

  Scenario: Open LOR RSAR application
    Given user opens LOR RSAR application
    Then user sees "Project Overview Timeline" screen
    And user sees "PROJECTS OVERVIEW" as the screen title

  Scenario: Validate navigation to Find Candidates screen
    When user selects the first project that has an unassigned role from Timeline view
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

  Scenario Outline: Validate empty shortlist
    Then user sees the empty shortlist with 4 slots
    And user sees the <pageElement> displayed as <data> on Find Candidates screen
    Examples:
      | pageElement      | data                                                                                              |
      | "title"          | "Options"                                                                                         |
      | "date and label" | "Phase starts: 19 September 2019"                                                                 |
      | "explainer text" | "Add suitable candidates to the option list in order. Place most suitable candidates at the top." |

  Scenario Outline: Add candidate to empty shortlist
    Given user sees the empty shortlist with 4 slots
    When user "clicks" "Add to options list" button from the first card of "suitable candidates" list
    Then user sees the selected candidate added to the "first" space in the shortlist
    And user sees Reorder list buttons from the first card of the shortlist disabled
    And user does not see the candidate on candidates list
    And user <action> the <lable> button from the first card of <location> list
    And user <action> the <label> button from the first card of <location> list
    Examples:
      | action | label                   | location  |
      | "sees" | "Remove from shortlist" | "options" |
      | "sees" | "Suggest candidate"     | "options" |

  Scenario: Add candidate to populated shortlist
    Given user sees the shortlist populated, but not full
    When user "clicks" "Add to options list" button from the first card of "suitable candidates" list
    Then user sees the candidate added to the "second" available space in the shortlist
    And user does not see the candidate on candidates list

  Scenario: Full shortlist validation
    When user adds canddidates until shortlist is full
    Then user sees all Add to options list buttons disabled on candidates list