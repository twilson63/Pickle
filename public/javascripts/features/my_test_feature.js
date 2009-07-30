Pickle().Feature({
  name: "MyTest",
  Sample: function () {
    Given('I have a link hello');
    Then('I should see "Hello"');    
  },
  Sample2: function () {
    Given('I have a radio button hello');
    And('I have a radio button world');
    When('I choose "world"');
    Then('world should be choosen');
  }
});

Pickle().Step({
  instruction: /^I have a link hello$/,
  test: function (){
    $('body').append(jLink("my_link", "Hello", "#"));
    return false;
  }
});

Pickle().Step({
  instruction: /^I have a radio button hello$/,
  test: function (){
    $('body').append(
      jLabel("my_world_1", "hello") +
      jRadio("my_world", "1")
    );
  }
});

Pickle().Step({
  instruction: /^I have a radio button world$/,
  test: function (){
    $('body').append(
      jLabel("my_world_2", "world") +
      jRadio("my_world", "2")
    );
  }
});

Pickle().Step({
  instruction: /^world should be choosen$/,
  test: function (){
    return $('input:radio[id=my_world_2]').attr('checked');
  }
});
