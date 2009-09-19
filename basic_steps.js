/*
  
*/

RegExp.prototype.escape = function(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}

/*
* Basic jQuery Pickle Steps 
* requires pickle and jquery
*
* Copyright (c) 2009 Jack Russell Software Company, LLC
* Licensed under the MIT license.
* http://github.com/twilson63/pickle/License
*
* Date: 2009-09-19 
* Revision: 00005
*/

Pickle('step', /^I should see "([^\"]*)"$/, function () {
  var argument_value = arguments[0][0];
  var rx = new RegExp(RegExp().escape(argument_value));
  if($("body").html().match(rx) == null) {
    return false;
  } else {
    return true;
  }
});

Pickle('step', /^I press "([^\"]*)"$/, function () {
  var argument_value = arguments[0][0];
  var submit = $('input:submit:[value="?"]'.replace(/\?/, argument_value));
  if(submit.length > 0) {
    submit[0].click();
    return true;
  } else {
    return false;
  }  
});

Pickle('step', /^I follow "([^\"]*)"$/, function () {
  var argument_value = arguments[0][0];
  var link = $('a:contains("?")'.replace(/\?/, argument_value));
  if(link.length == 0 ) {
    return false;
  } else {
    link.click();
    return true;
  }
  
});

Pickle('step', /^I fill in "([^\"]*)" with "([^\"]*)"$/, function () {
  var text = null;
  
  // try to find input by label
  var label = $("label:contains(?)".replace(/\?/, arguments[0][0]));
  if(label.length > 0) {
    text = $('#?'.replace(/\?/, label.attr('for')));
  } else {
    text = $('#?'.replace(/\?/, arguments[0][0]));
  } 

  if(text.length > 0) {
    text.val(arguments[0][1]);
    return true;
  } else {
    return false;
  }
  
});

Pickle('step', /^I select "([^\"]*)" from "([^\"]*)"$/, function () {
  var selector = 'select:[id=?] option:contains("2")';
  var option = null;
  
  // try to find input by label
  var label = $("label:contains(?)".replace(/\?/, arguments[0][1]));
  if(label.length > 0) {
    option = $(selector.replace(/\?/,label.attr('for')).replace(/2/, arguments[0][0]));
  } else {
    option = $(selector.replace(/\?/,arguments[0][1]).replace(/2/, arguments[0][0]));
  }
  
  if(option.length > 0) {
    option[0].selected = true;
    return true;
  } else {
    return false;
  }

});

Pickle('step', /^I check "([^\"]*)"$/, function () {
  var label = this.get_label(arguments[0]);
  var selector = 'input';
  if(label.length > 0) {
   var checkbox = $('input:[id=' + label.attr('for') + ']') || label.children(selector);
   if(checkbox.length > 0) {
     checkbox.attr('checked', true);
     return true;
   } else {
     return false;
   }
  } else {
    return false;
  }  
});

Pickle('step', /^I uncheck "([^\"]*)"$/, function () {
  var label = this.get_label(arguments[0]);
  var selector = 'input';
  if(label.length > 0) {
   var checkbox = $('input:[id=' + label.attr('for') + ']') || label.children(selector);
   if(checkbox.length > 0) {
     checkbox.attr('checked', false);
     return true;
   } else {
     return false;
   }
  } else {
    return false;
  }  
});

Pickle('step', /^I choose "(^\"]*)"$/, function () {
  var label = this.get_label(arguments[0]);
  var selector = 'input';
  if(label.length > 0) {
   radio = $('input:[id=' + label.attr('for') + ']') || label.children(selector);
   if(radio.length > 0) {
     radio.attr('checked', true);
     return true;
   } else {
     return false;
   }
  } else {
    return false;
  }
  
});



