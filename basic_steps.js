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

Pickle('step', /^I should see "([^\"]*)"$/, function (a) {
  var rx = new RegExp(RegExp().escape(a));
  if($("body").html().match(rx) == null) {
    return false;
  } else {
    return true;
  }
});

Pickle('step', /^I press "([^\"]*)"$/, function (a) {
  var submit = $('input:submit:[value="?"]'.replace(/\?/, a));
  if(submit.length > 0) {
    submit[0].click();
    return true;
  } else {
    return false;
  }  
});

Pickle('step', /^I follow "([^\"]*)"$/, function (a) {
  var link = $('a:contains("?"):visible'.replace(/\?/, a));
  if(link.length == 0 ) {
    return false;
  } else {
    link.click();
    return true;
  }
  
});

Pickle('step', /^I fill in "([^\"]*)" with "([^\"]*)"$/, function (a,b) {
  var text = null;
  
  // try to find input by label
  var label = $("label:contains(?):visible".replace(/\?/, a));
  if(label.length > 0) {
    text = $('#?'.replace(/\?/, label.attr('for')));
  } else {
    text = $('#?'.replace(/\?/, a));
  } 

  if(text.length > 0) {
    text.val(b);
    return true;
  } else {
    return false;
  }
  
});

Pickle('step', /^I select "([^\"]*)" from "([^\"]*)"$/, function (a, b) {
  var selector = 'select:[id=?] option:contains("2")';
  var option = null;
  
  // try to find input by label
  var label = $("label:contains(?)".replace(/\?/, b));
  if(label.length > 0) {
    option = $(selector.replace(/\?/,label.attr('for')).replace(/2/, a));
  } else {
    option = $(selector.replace(/\?/,b).replace(/2/, a));
  }
  
  if(option.length > 0) {
    option[0].selected = true;
    return true;
  } else {
    return false;
  }

});

Pickle('step', /^I check "([^\"]*)"$/, function (a) {
  var selector = 'input:checkbox';
  var checkbox = null;
  
  var label = $("label:contains(?)".replace(/\?/, a));
  if(label.length > 0) {
    checkbox = $('input:[id=' + label.attr('for') + ']') || label.children(selector);
  } else {
    checkbox = $('input:checkbox#?'.replace(/\?/, a));
  }

  if(checkbox.length > 0) {
    checkbox.attr('checked', true);
    return true;
  } else {
    return false;
  }
});

Pickle('step', /^I uncheck "([^\"]*)"$/, function (a) {
  var selector = 'input';
  var checkbox = null;
  
  var label = $("label:contains(?)".replace(/\?/, a));  
  if(label.length > 0) {
   checkbox = $('input:[id=' + label.attr('for') + ']') || label.children(selector);
  } else {
   checkbox = $('input:checkbox#?'.replace(/\?/, a));
  }
  if(checkbox.length > 0) {
   checkbox.attr('checked', false);
   return true;
  } else {
   return false;
  }

});

Pickle('step', /^I choose "([^\"]*)"$/, function (a) {
  var selector = 'input:radio';
  var radio = null;
  
  var label = $("label:contains(?)".replace(/\?/, a));  
  if(label.length > 0) {
   radio = $('input#?'.replace(/\?/, label.attr('for'))) || label.children(selector);
  } else {
   radio = $('input:radio#?'.replace(/\?/, a));
  }

  if(radio.length > 0) {
    radio.attr('checked', true);
    return true;
  } else {
    return false;
  }
  
});



