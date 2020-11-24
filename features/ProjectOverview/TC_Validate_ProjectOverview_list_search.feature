# Can't be run outside Jumpbox
# @REGRESSION
# Feature: Validate Projects Overview list search

#   Scenario: Open LOR RSAR application
#     Given user opens LOR RSAR application
#     Then user sees "Project Overview Timeline" screen
#     And user sees "PROJECTS OVERVIEW" as the screen title

#   Scenario: Validate Projects Overview list search input on Map screen
#     When user "clicks" "Map" button on the Project Overview screen
#     Then user sees "Project Overview Map" screen
#     And user sees a search input with "Search projects using key words" text as placeholder on Project Overview "Map" screen

#   Scenario: Validate Projects Overview list search input on Timeline screen
#     When user "clicks" "Timeline" button on the Project Overview screen
#     Then user sees "Project Overview Timeline" screen
#     And user sees a search input with "Search projects using key words" text as placeholder on Project Overview "Timeline" screen

#   Scenario: Validate Projects Overview list search editability on Timeline screen
#     When user types "Test1" in the search input on Project Overview "Timeline" screen
#     Then user sees "Test1" text in the search input on Project Overview "Timeline" screen
#     When user types "Test2" in the search input on Project Overview "Timeline" screen
#     Then user sees "Test2" text in the search input on Project Overview "Timeline" screen

#   Scenario: Validate Projects Overview list search editability on Map screen
#     When user "clicks" "Map" button on the Project Overview screen
#     Then user sees "Project Overview Map" screen
#     When user types "Test1" in the search input on Project Overview "Map" screen
#     Then user sees "Test1" text in the search input on Project Overview "Map" screen
#     When user types "Test2" in the search input on Project Overview "Map" screen
#     Then user sees "Test2" text in the search input on Project Overview "Map" screen

#   Scenario: Validate Projects Overview list search by pressing ENTER on Map screen
#     When user types "Collins Group" in the search input on Project Overview "Map" screen
#     And user presses "ENTER" key
#     Then user sees "Search results" text as the list heading on Project Overview "Map" screen
#     And user sees only projects with "Client" name as "Collins Group" on Project Overview "Map" screen
#     When user types "ET ASPERNATUR CONSECTETUR" in the search input on Project Overview "Map" screen
#     And user presses "ENTER" key
#     Then user sees "Search results" text as the list heading on Project Overview "Map" screen
#     And user sees only projects with "Project" name as "ET ASPERNATUR CONSECTETUR" on Project Overview "Map" screen

#   Scenario: Validate Projects Overview list search by pressing ENTER on Timeline screen
#     When user "clicks" "Timeline" button on the Project Overview screen
#     Then user sees "Project Overview Timeline" screen
#     When user types "Collins Group" in the search input on Project Overview "Timeline" screen
#     And user presses "ENTER" key
#     Then user sees "Search results" text as the list heading on Project Overview "Timeline" screen
#     And user sees only projects with "Client" name as "Collins Group" on Project Overview "Timeline" screen
#     When user types "CORPORIS HARUM DISTINCTIO" in the search input on Project Overview "Timeline" screen
#     And user presses "ENTER" key
#     Then user sees "Search results" text as the list heading on Project Overview "Timeline" screen
#     And user sees only projects with "Project" name as "CORPORIS HARUM DISTINCTIO" on Project Overview "Timeline" screen

#   Scenario: Validate Projects Overview list search by clicking the search icon on Timeline screen
#     When user types "Collins Group" in the search input on Project Overview "Timeline" screen
#     And user clicks Search icon on Project Overview "Timeline" screen
#     Then user sees "Search results" text as the list heading on Project Overview "Timeline" screen
#     And user sees only projects with "Client" name as "Collins Group" on Project Overview "Timeline" screen
#     When user types "ET ASPERNATUR CONSECTETUR" in the search input on Project Overview "Timeline" screen
#     And user clicks Search icon on Project Overview "Timeline" screen
#     Then user sees "Search results" text as the list heading on Project Overview "Timeline" screen
#     And user sees only projects with "Project" name as "ET ASPERNATUR CONSECTETUR" on Project Overview "Timeline" screen

#   Scenario: Validate Projects Overview list search by clicking the search icon on Map screen
#     When user "clicks" "Map" button on the Project Overview screen
#     Then user sees "Project Overview Map" screen
#     When user types "Collins Group" in the search input on Project Overview "Map" screen
#     And user clicks Search icon on Project Overview "Map" screen
#     Then user sees "Search results" text as the list heading on Project Overview "Map" screen
#     And user sees only projects with "Client" name as "Collins Group" on Project Overview "Map" screen
#     When user types "CORPORIS HARUM DISTINCTIO" in the search input on Project Overview "Map" screen
#     And user clicks Search icon on Project Overview "Map" screen
#     Then user sees "Search results" text as the list heading on Project Overview "Map" screen
#     And user sees only projects with "Project" name as "CORPORIS HARUM DISTINCTIO" on Project Overview "Map" screen

#   Scenario: Validate Projects Overview list search by timeout on Map screen
#     When user types "Collins Group" in the search input on Project Overview "Map" screen
#     And user waits "2" seconds
#     Then user sees "Search results" text as the list heading on Project Overview "Map" screen
#     And user sees only projects with "Client" name as "Collins Group" on Project Overview "Map" screen
#     When user types "CORPORIS HARUM DISTINCTIO" in the search input on Project Overview "Map" screen
#     And user waits "2" seconds
#     Then user sees "Search results" text as the list heading on Project Overview "Map" screen
#     And user sees only projects with "Project" name as "CORPORIS HARUM DISTINCTIO" on Project Overview "Map" screen

#   Scenario: Validate Projects Overview list search by timeout on Timeline screen
#     When user "clicks" "Timeline" button on the Project Overview screen
#     Then user sees "Project Overview Timeline" screen
#     When user types "Collins Group" in the search input on Project Overview "Timeline" screen
#     And user waits "2" seconds
#     Then user sees "Search results" text as the list heading on Project Overview "Timeline" screen
#     And user sees only projects with "Client" name as "Collins Group" on Project Overview "Timeline" screen
#     When user types "ET ASPERNATUR CONSECTETUR" in the search input on Project Overview "Timeline" screen
#     And user waits "2" seconds
#     Then user sees "Search results" text as the list heading on Project Overview "Timeline" screen
#     And user sees only projects with "Project" name as "ET ASPERNATUR CONSECTETUR" on Project Overview "Timeline" screen
