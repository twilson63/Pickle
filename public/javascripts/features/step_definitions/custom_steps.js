Pickle('step', /^I have a radio list form$/, function(){
  $('body').append(
    jTag('form',
      jLabel("option_1", jRadio("option", "1") + "Option1") + _br +
      jLabel("option_2", jRadio("option", "2") + "Option2") + _br +
      jLabel("option_3", jRadio("option", "2") + "Option3") + _br +

      jSubmit('Submit'),
      [jAt('name','radio_list'),
      jAt('id', 'radio_list'),
      jAt('method','get'),
      jAt('action', '#')]
  ));
  
  $('#radio_list').live('submit', function() {
    //var checked_items = null;
    var selected_items = [];
    $('input:radio:checked').each(function(i){
     selected_items[selected_items.length] = this.value;
    });
    
    $('body').append(
      jTag('p', 'You choose Option?'.replace(/\?/, selected_items.join(', '))
    ));
    return false;
  });
  return true;
  
});

Pickle('step', /^I have a check list form$/, function(){
  $('body').append(
    jTag('form',
      jLabel("item1", jCheck("item1", "Item1") + "Item1") + _br +
      jLabel("item2", jCheck("item2", "Item2") + "Item2") + _br +
      jLabel("item3", jCheck("item3", "Item3") + "Item3") + _br +

      jSubmit('Submit'),
      [jAt('name','check_list'),
      jAt('id', 'check_list'),
      jAt('method','get'),
      jAt('action', '#')]
  ));
  
  $('#check_list').live('submit', function() {
    //var checked_items = null;
    var checked_items = [];
    $('input:checkbox:checked').each(function(i){
     checked_items[checked_items.length] = this.value;
    });
    
    $('body').append(
      jTag('p', 'You checked ?'.replace(/\?/, checked_items.join(', '))
    ));
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
  
  $('#select_fruit').live('submit', function() {
    $('body').append(
      jTag('p', 'Your favorite fruit is ?'.replace(/\?/,$('select#fruit').val())
    ));
    return false;
  });
  return true;
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

