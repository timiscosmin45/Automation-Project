Feature: Validate User access of the Laing O'Rourke network

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

  Scenario: Validate edit permissions
    Given I am a user
    And I am inside the LOR network
    And I am logged into LOR's Active Directory
    And I do NOT have edit permissions
    When I try and edit something in the app
    Then I am not able to

  Scenario: Validate no edit permission
    Given I am a user
    And I am inside the LOR network
    And I am logged into LOR's Active Directory
    And I do have edit permissions
    When I try and edit something in the app
    Then I am able to

  Scenario: Validate read access not assigned
    Given I am a user
    And I am inside the LOR network
    And I am logged into LOR's Active Directory
    And I have NOT been assigned Read or Write access
    When I try and access the app
    Then I see a message to contact the business owner for the app

  Scenario: Validate read access assigned
    Given I am a user
    And I am inside the LOR network
    And I am logged into LOR's Active Directory
    And I have been assigned Read access
    When I try and access the app
    Then I can view the app

  Scenario: Validate edit access assigned
    Given I am a user
    And I am inside the LOR network
    And I am logged into LOR's Active Directory
    And I have been assigned Edit access
    And I try and access the app
    Then I can make changes in the app

  Scenario: Validate edit access not assigned
    Given I am a user
    And I am inside the LOR network
    And I am logged into LOR's Active Directory
    And I have been assigned Read access
    And I do NOT have edit permissions
    When I try and edit something in the app
    Then I am NOT able to
