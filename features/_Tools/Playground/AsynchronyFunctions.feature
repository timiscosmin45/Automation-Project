Feature: Test asynchrony with a custom asynchronous function

  Scenario: Before all, we try a synchronous call
    Then playground synchronous code

  Scenario: Good way to do asynchrony
    Then playground GOOD asynchrony with custom function

  # Run WRONG steps separately
  Scenario: Wrong way 1 (this will print incorrect data)
    Then playground WRONG asynchrony with custom function 1

  # Run WRONG steps separately
  Scenario: Wrong way 2 (this will print the data after the step is finished)
    Then playground WRONG asynchrony with custom function 2
