/*!
 * Pickle JavaScript Library v0.0.1
 * http://pickle.jackhq.com/
 *
 * Copyright (c) 2009 Jack Russell Software Company, LLC
 * Licensed under the MIT licenses.
 * http://www.jackhq.com/License
 *
 * Date: 2009-07-24 14:23:21 -0500 (Fri, 24 July 2009)
 * Revision: 1
 */
var Steps = [];

// Pickle Steps

var Given = When = Then = And = function (instruction) {
  var fired = false;
  var test = function () {
    console.log("Test Not Defined: " + instruction);
  }
  /* Find Test by instruction */
  for(i = 0; i < Steps.length; i++) {
    a = instruction.match(Steps[i].instruction);
    if (a != null) {
      fired = true;
      if (a.length == 1) {
        if( Steps[i].test() == false) {
          console.log("Step Failed: " + instruction);
        } else {
          console.log("Step Passed: " + instruction);
        }        
      } else if (a.length == 2) {
        if( Steps[i].test(a[1]) == false) {
          console.log("Step Failed: " + instruction);
        } else {
          console.log("Step Passed: " + instruction);
        }
      } else if (a.length == 3) {
        if( Steps[i].test(a[1], a[2]) == false) {
          console.log("Step Failed: " + instruction);
        } else {
          console.log("Step Passed: " + instruction);
        }        
      }
      
      break;
    }
  }
  if(!fired) {
    test();
  }
}

// Common Pickle Step Definitions

var ShouldSee = {
  instruction: /^I should see (.*)$/,
  test: function (arg) {
    return PageContains(arg);
  }
}

Steps[Steps.length] = ShouldSee;


var Follow = {
  instruction: /^I follow (.*)$/,
  test: function (arg) {
    return LinkClick(arg);
  }
}

Steps[Steps.length] = Follow;


var FillIn = {
  instruction: /^I fill in (.*) with (.*)$/,
  test: function (arg, arg2) {
    return SetTextField(arg, arg2)
    
  }
  
}

Steps[Steps.length] = FillIn;

var PressSubmitButton = {
  instruction: /^I press (.*)$/,
  test: function (arg) {
    return PressButton(arg);
  }
}

Steps[Steps.length] = PressSubmitButton;




// Basic Test Functions
var PageContains = function(arg) {
  regexpression = new RegExp(arg);
  if($("body").html().match(regexpression) == null) {
    return false;
  } else {
    return true;
  }
}

var LinkClick = function(arg) {
  if($('a:contains("' + arg + '")').length == 0 ) {
    return false;
  } else {
    $('a:contains("' + arg + '")').click();
    return true;
  }
}

var SetTextField = function(arg, arg2) {
  label = $('label:contains("' + arg + '")');
  if(label.length > 0) {  
    c = $('input:[name="' + label.attr('for') + '"]');
    if(c.length > 0 ) {
      c.val(arg2);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

var PressButton = function(arg) {
  obj = $('input:[value="' + arg + '"]');
  if(obj.length > 0) {
    obj.click();
    return true;
  } else {
    return false;
  }
}
