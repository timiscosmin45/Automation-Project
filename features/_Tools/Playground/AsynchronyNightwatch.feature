Feature: Test asynchrony with Nightwatch

  Scenario: Open basic page
    Then playground open "basic" html page

  Scenario: Good way to do asynchrony
    Then playground GOOD asynchrony with Nightwatch

  # Run WRONG steps separately
  Scenario: Wrong way 1 (We don't get the value that we want)
    Then playground WRONG asynchrony with Nightwatch 1

  # Run WRONG steps separately
  Scenario: Wrong way 2 (Step finishes before we do what we are supposed to do)
    Then playground WRONG asynchrony with Nightwatch 2

  # Run WRONG steps separately
  Scenario: Wrong way 3 (Does a Timeout)
    Then playground WRONG asynchrony with Nightwatch 3

  # Run WRONG steps separately
  Scenario: Wrong way 4 (Doesn't repect any synchrony)
    Then playground WRONG asynchrony with Nightwatch 4

  # Run WRONG steps separately
  Scenario: Wrong way 5 (Can work sometimes, but has synchrony issues)
    Then playground WRONG asynchrony with Nightwatch 5
