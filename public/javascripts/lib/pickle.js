/*!
 * Pickle JavaScript Library v0.0.7
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
    Features = window.Features = [],
    _Pickle = window.Pickle,
    Pickle = window.Pickle = function() {
      return Pickle.fn.init();
    },
    Given = window.Given = When = window.When = Then = window.Then = And = window.And = function(instruction) {
      Pickle.fn.run_step(instruction);
      //return true;
    }

  Pickle.fn = Pickle.prototype = {
    init: function() {
      return Pickle.fn;
    },
    Step: function (obj) {
      Steps[Steps.length] = obj;
    },
    Feature: function (obj) {
      Features[Features.length] = obj;
    },
    Run: function(feature, scenario) {
      $.each(Features, function() {
        if(this.name == feature) {
          this[scenario]();
          return;
        }
      });
    },
    Contains: function(value) {
      if(typeof(value) != "string") {
        throw "Requires String as value";
      }
      var rx = new RegExp(RegExp.escape(value));
      if($("body").html().match(rx) == null) {
        return false;
      } else {
        return true;
      }
    },
    Click: function(linkname) {
      var selector = 'a:contains("?")';
      var link = $(selector.replace(/\?/, linkname));
      if(link.length == 0 ) {
        return false;
      } else {
        link.click();
        return true;
      }
    },
    SetText: function(name,value) {
      var label = this.get_label(name);
      var selector = '#?';
      if(label.length > 0) {
        
        var text = $(selector.replace(/\?/, label.attr('for')));
        if(text.length > 0) {
          text.val(value);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    PressButton: function(name) {
      var selector = 'input:[value="?"]';
      var submit = $(selector.replace(/\?/, name));
      if(submit.length > 0) {
        submit.click();
        return true;
      } else {
        return false;
      }
    },
    Select: function(value, name) {
      var label = this.get_label(name);
      var selector = 'select:[id=?] option:contains("2")';
      if(label.length > 0) {
        var option = $(selector.replace(/\?/,label.attr('for')).replace(/2/, value));
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
      var label = this.get_label(name);
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
    },
    UnCheck: function(name) {
      var label = this.get_label(name);
      var selector = 'input';
      if(label.length > 0) {
       checkbox = $('input:[id=' + label.attr('for') + ']') || label.children(selector);
       if(checkbox.length > 0) {
         checkbox.attr('checked', false);
         return true;
       } else {
         return false;
       }
      } else {
        return false;
      }
    },
    Choose: function(name) {
      var label = this.get_label(name);
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
    },
    get_label: function(name) {
      var selector = 'label:contains("?")';
      return $(selector.replace(/\?/,name));
    },
    run_step: function(instruction) {
      var fired = false;
      var test = function () {
        console.log("Test Not Defined: " + instruction);
      }
      /* Find Test by Instruction */
      for(i = 0; i < Steps.length; i++) {
        var a = instruction.match(Steps[i].instruction);
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

Pickle().Step( {
  instruction: /^I should see "([^\"]*)"$/,
  test: function (arg) {
    return Pickle().Contains(arg);
  }
});


Pickle().Step( {
  instruction: /^I follow "([^\"]*)"$/,
  test: function (arg) {
    return Pickle().Click(arg);
  }
});

Pickle().Step(  {
  instruction: /^I fill in "([^\"]*)" with "([^\"]*)"$/,
  test: function (arg, arg2) {
    return Pickle().SetText(arg, arg2)
    
  }
  
});

Pickle().Step( {
  instruction: /^I press "([^\"]*)"$/,
  test: function (arg) {
    return Pickle().PressButton(arg);
  }
});

Pickle().Step(  {
  instruction: /^I select "([^\"]*)" from "([^\"]*)"$/,
  test: function (arg, arg2) {
    return Pickle().Select(arg, arg2);
  }
});

Pickle().Step(  {
  instruction: /^I check "([^\"]*)"$/,
  test: function (arg) {
    return Pickle().Check(arg);
  }
});

Pickle().Step(  {
  instruction: /^I choose "([^\"]*)"$/,
  test: function (arg) {
    return Pickle().Choose(arg);
  }
});

