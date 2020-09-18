Feature: Test asynchrony inside loops

  Scenario: Open basic page
    Then playground open "basic" html page

  Scenario: Good way to do asynchrony in a loop, with a js iterator (with custom function)
    Then playground GOOD asynchrony with a js iterator with custom function

  Scenario: Good way to do asynchrony in a loop, with a js iterator (with client)
    Then playground GOOD asynchrony with a js iterator

  Scenario: Wrong way to do asynchrony in a loop, with an Array iterator
    Then playground WRONG asynchrony with Array iterator
