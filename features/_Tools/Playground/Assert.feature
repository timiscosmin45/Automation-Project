Feature: Test assert libraries

  Scenario: Good way to do assert(or expect) with Chai's assert (RECOMMENDED)
    Then playground GOOD chai assert

  Scenario: Good way to do assert with Nightwatch's assert (Ok, but not recommended)
    Then playground GOOD nightwatch assert

  Scenario: Wrong way to do assert with Nightwatch's assert
    Then playground WRONG nightwatch assert
