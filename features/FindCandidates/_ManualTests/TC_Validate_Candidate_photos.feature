Feature: Validate Candidate Photos - Find Candidates screen

  Scenario: Validate existing candidate photos
    Given I am a LOR resourcing team member
    When I am viewing the Find Candidate screen
    Then I see a photo for each candidate

  Scenario: Validate non-existent candidate photos
    Given I am a LOR resourcing team member
    When I am viewing the Find Candidate screen
    Then I view a candidate that doesn't have a photo
    And I see a placeholder photo for the candidate
