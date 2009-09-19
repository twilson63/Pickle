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
  
  
});

Pickle('step', /^I have an empty page$/, function(){
  $('body').empty();
  return true;
});

Pickle('step', /^I have a link called say hello$/, function(){
  $('body').append(jLink("Say Hello", "#"));
  $('a:contains("Say Hello")').click(function (){
    $('body').append(jTag('p', 'Hello World'));    
  });
  return true;
});

Pickle('step', /^I have a simple form$/, function (){
  $('body').append(
    jTag('form',
      jLabel('name', "Name" + _br + 
      jText('name')) + _br +
      jSubmit('Submit'),
      [jAt('name','simple_form'),
      jAt('id', 'simple_form'),
      jAt('method','get'),
      jAt('action', '#')]
  ));
  
  $('#simple_form').unbind().live('submit', function(){
    $('body').append(jTag('p', 'Hello ?!'.replace(/\?/,$('input#name').val())));
    return false;
  });
  return true;
});

Pickle('step', /^I have a select fruit form$/, function(){
  $('body').append(
    jTag('form',
      jLabel('fruit', "Select Fruit" + _br + 
      jSelect('fruit',["Select","Apple","Orange"])) + _br +
      jSubmit('Submit'),
      [jAt('name','select_fruit'),
      jAt('id', 'select_fruit'),
      jAt('method','get'),
      jAt('action', '#')]
  ));
  
  $('#select_fruit').unbind().live('submit', function() {
    $('body').append(
      jTag('p', 'Your favorite fruit is ?'.replace(/\?/,$('select#fruit').val())
    ));
    return false;
  });
  return true;
});

