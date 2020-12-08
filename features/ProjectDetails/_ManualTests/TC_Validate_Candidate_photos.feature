Feature: Validate Candidate Photos - Project Details screen

  Scenario: Validate existent candidate photos
    Given I am a LOR resourcing team member
    When I am viewing the project org chart
    Then I see a photo for each candidate

  Scenario: Validate inexistent candidate photos
    Given I am a LOR resourcing team member
    And I am viewing the project org chart
    When I view a candidate that doesn't have a photo
    Then I see a placeholder photo for the candidate
