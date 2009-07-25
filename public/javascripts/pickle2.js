/*!
 * Pickle JavaScript Library v0.0.3
 * http://pickle.jackhq.com/
 *
 * Copyright (c) 2009 Jack Russell Software Company, LLC
 * Licensed under the MIT licenses.
 * http://www.jackhq.com/License
 *
 * Date: 2009-07-24 14:23:21 -0500 (Fri, 24 July 2009)
 * Revision: 1
 */
(function(){

  var
    window = this,
    undefined,
    Steps = window.Steps = [],
    _Pickle = window.Pickle,
    Pickle = window.Pickle = function() {
      return Pickle.fn.init();
    },
    Given = window.Given = When = window.When = Then = window.Then = And = window.And = function(instruction) {
      Pickle.fn.step(instruction);
      return true;
    }

  Pickle.fn = Pickle.prototype = {
    init: function() {
      return Pickle.fn;
    },
    AddStep: function (obj) {
      Steps[Steps.length] = obj;
    },
    Contains: function(value) {
      rx = new RegExp(value);
      if($("body").html().match(rx) == null) {
        return false;
      } else {
        return true;
      }
    },
    Click: function(linkname) {
      selector = 'a:contains("?")';
      link = $(selector.replace(/\?/, linkname));
      if(link.length == 0 ) {
        return false;
      } else {
        link.click();
        return true;
      }
    },
    SetText: function(name,value) {
      label = get_label(name);
      selector = 'input:[id=?]';
      if(label.length > 0) {
        textbox = $(selector.replace(/\?/, label.attr('for')));
        if(textbox.length > 0) {
          textbox.val(value);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    PressButton: function(name) {
      selector = 'input:[value="?"]';
      submit = $(selector.replace(/\?/, name));
      if(submit.length > 0) {
        submit.click();
        return true;
      } else {
        return false;
      }
    },
    Select: function(value, name) {
      label = get_label(name);
      selector = 'select:[id=?] option:contains("2")';
      if(label.length > 0) {
        option = $(selector.replace(/\?/,label.attr('for')).replace(/2/, value));
        if(option.length > 0) {
          option[0].selected = true;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    Check: function(name) {
      return false;
    },
    UnCheck: function(name) {
      return false;
    },
    Choose: function(name) {
      return false;
    },
    get_label: function(name) {
      selector = 'label:contains("?")';
      return $(selector.replace(/\?/,name));
    },
    step: function(instruction) {
      var fired = false;
      var test = function () {
        console.log("Test Not Defined: " + instruction);
      }
      /* Find Test by Instruction */
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
            if(Steps[i].test(a[1]) == false) {
              console.log("Step Failed: " + instruction);
            } else {
              console.log("Step Passed: " + instruction);
            }
          } else if (a.length == 3) {
              if(Steps[i].test(a[1],a[2]) == false) {
                console.log("Step Failed: " + instruction);
              } else {
                console.log("Step Passed: " + instruction);
              }
          }
        }
      }
    }

  }

})();

// Common Pickle Step Definitions

Pickle().AddStep( {
  instruction: /^I should see "([^\"]*)"$/,
  test: function (arg) {
    return Pickle().Contains(arg);
  }
});


Pickle().AddStep( {
  instruction: /^I follow "([^\"]*)"$/,
  test: function (arg) {
    return Pickle().Click(arg);
  }
});

Pickle().AddStep(  {
  instruction: /^I fill in "([^\"]*)" with "([^\"]*)"$/,
  test: function (arg, arg2) {
    return Pickle().SetText(arg, arg2)
    
  }
  
});

Pickle().AddStep( {
  instruction: /^I press "([^\"]*)"$/,
  test: function (arg) {
    return Pickle().PressButton(arg);
  }
});

Pickle().AddStep(  {
  instruction: /^I select "([^\"]*)" from "([^\"]*)"$/,
  test: function (arg, arg2) {
    return Pickle().Select(arg, arg2);
  }
});

Pickle().AddStep(  {
  instruction: /^I check "([^\"]*)"$/,
  test: function (arg) {
    return Pickle().Check(arg);
  }
});

