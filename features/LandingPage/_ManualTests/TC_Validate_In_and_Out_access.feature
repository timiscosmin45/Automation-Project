Feature: Validate In/Out access of the Laing O'Rourke network

  Scenario: Validate user access outside the network
    Given I am a user outside of the LOR network
    When I try to access the LOR RSAR app
    Then I see an error

  Scenario: Validate user Access inside the network
    Given I am a user inside of the LOR network
    When I try to access the LOR RSAR app
    Then I can view the app
