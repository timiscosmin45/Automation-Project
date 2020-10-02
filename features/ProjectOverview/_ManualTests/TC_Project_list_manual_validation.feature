@Manual
Feature: Validate Project List

  The purpose of this test is the validation of the project list
  UI link: https://zpl.io/2EMzkOy

  As a member of the LOR resourcing team
  I want to quickly understand the status of a project & it's resourcing life cycle,
  I want to easily find the most relevant projects to the resourcing team
  So that I can quickly look at the projects that require attention

  Scenario Outline: Validate status icon and status color
    Given user opens LOR RSAR application
    When user sees "Project overview" screen
    And user views project's details in the project list
    Then user sees the <status> icon
    And user sees <status> color
    Examples:
      | status             |
      | "Early Engagement" |
      | "Bid"              |
      | "PCSA"             |
      | "Live Projects"    |

  Scenario Outline: Validate the order of the projects
    Given user opens LOR RSAR application
    When user sees "Project overview" screen
    And user views the project list on <screen>
    Then user sees the projects ordered earliest-latest by project start date
    Examples:
      | screen     |
      | "Timeline" |
      | "Map"      |