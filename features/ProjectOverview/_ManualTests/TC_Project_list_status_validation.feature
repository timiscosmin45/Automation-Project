Feature: Validate Project List status

  The purpose of this test is the validation of project list status
  UI link: https://zpl.io/2EMzkOy

  As a member of the LOR resourcing team
  I want to quickly understand the status of a project
  So that I know where it is in it's resourcing life cycle

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