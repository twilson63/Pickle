Pickle('feature', 'basic_steps', function() {
  Scenario('should_see', function() {
    Given('I have an empty page');
    And('I have a link called say hello')
    When('I follow "Say Hello"');
    Then('I should see "Hello World"'); 
    
        
  });
  
  Scenario('Hello Form', function() {
    Given('I have an empty page');
    And('I have a simple form');
    When('I fill in "Name" with "Joe"');
    And('I press "Submit"');
    Then('I should see "Hello Joe!"');
  });
  
  Scenario('Select Favorite Fruit', function() {
    Given('I have an empty page');
    And('I have a select fruit form');
    When('I select "Apple" from "Select Fruit"');
    And('I press "Submit"');
    Then('I should see "Your favorite fruit is Apple"');
    
  });
  
  Scenario('Check List', function() {
    Given('I have an empty page');
    And('I have a check list form');
    When('I check "Item1"');
    And('I check "Item2"');
    And('I press "Submit"');
    Then('I should see "You checked Item1, Item2"');
  });
});





