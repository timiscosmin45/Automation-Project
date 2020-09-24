Feature: Validate Project List status

    The purpose of this test is the validation of project list status
    UI link: https://zpl.io/2EMzkOy

    As a member of the LOR resourcing team
    I want to quickly understand the status of a project
    So that I know where it is in it's resourcing life cycle

    Scenario: Validate Early Engagement status
      Given user opens LOR RSAR application
      When user sees "Project overview" screen
      And user views project's details in the project list
      Then user sees the Early Engagement status icon
      And user sees Early Engagement status color
    
    Scenario: Validate Bid status
      Given user opens LOR RSAR application
      When user sees "Project overview" screen
      And user views project's details in the project list
      Then user sees the Bid status icon
      And user sees Bid status color

    Scenario: Validate PCSA status
      Given user opens LOR RSAR application
      When user sees "Project overview" screen
      And user views project's details in the project list
      Then user sees the PCSA status icon
      And user sees PCSA status color

    Scenario: Validate Live Projects status
      Given user opens LOR RSAR application
      When user sees "Project overview" screen
      And user views project's details in the project list
      Then user sees the Live Projects status icon
      And user sees Live Projects status color as blue