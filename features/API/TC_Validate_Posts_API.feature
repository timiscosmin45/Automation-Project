Feature: Validate Posts endpoint from jsonplaceholder

  Scenario: Check that retrieve Posts endpoint from jsonplaceholder is working correctly
    Then check that all Posts response is working correctly

  Scenario: Check that retrieve Posts endpoint from jsonplaceholder is replying as expected
    Then check that Posts response with a valid post is working correctly

  Scenario: Check that retrieve Posts endpoint from jsonplaceholder is replying as expected
    Then check that Posts response with an incorrect post is replying as expected

  Scenario: Check that create Posts endpoint from jsonplaceholder is working correctly
    Then check that create Posts endpoint is working correctly
