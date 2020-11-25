Feature: Validate In/Out access of the Laing O'Rourke network

  Scenario: Validate user access outside the LOR network
    Given I am a user outside of the LOR network
    When I try to access the LOR RSAR app
    Then I see an error

  Scenario: Validate user access inside the LOR network
    Given I am a user inside of the LOR network
    When I try to access the LOR RSAR app
    Then I can view the app

  Scenario: Validate user access inside the LOR network - not logged in to AD
    Given I am a user inside of the LOR network
    And I am not logged into LOR's Active Directory
    When I try to access the LOR RSAR app
    Then I see a prompt to log in to AD

  Scenario: Validate user access inside the LOR network - logged in to AD
    Given I am a user inside of the LOR network
    And I am logged into LOR's Active Directory
    When I try to access the LOR RSAR app
    And I have the correct permissions
    Then I can view the app

