/*!
 * Pickle JavaScript Library v0.1.1
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
      if(!Pickle.fn.run_step(instruction)) {
        throw "Error";
      }
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
          try {
            this[scenario]();
          } catch (err) {
            console.error(feature, "Step Execution Failed");
          }
          return;
        }
      });
    },
    RunAll: function() {
      $.each(Features, function() {
        console.log("Feature:" + this.name);
        for(var method in this) {
          if(method != "name" && method != "Background" && method != "Load") {
            console.log("  Scenario: " + method);
            try {
              this[method]();
            } catch (err) {
              console.error(this.name, "Step Execution Failed");
            }
            break;
          }
          
        }
      });      
    },
    Contains: function(args) {
      if(typeof(args[0]) != "string") {
        throw "Requires String as value";
      }
      var rx = new RegExp(RegExp.escape(args[0]));
      if($("body").html().match(rx) == null) {
        return false;
      } else {
        return true;
      }
    },
    Click: function(args) {
      var selector = 'a:contains("?")';
      var link = $(selector.replace(/\?/, args[0]));
      if(link.length == 0 ) {
        return false;
      } else {
        link.click();
        return true;
      }
    },
    SetText: function(args) {
      var label = this.get_label(args[0]);
      var selector = '#?';
      if(label.length > 0) {
        
        var text = $(selector.replace(/\?/, label.attr('for')));
        if(text.length > 0) {
          text.val(args[1]);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    PressButton: function(args) {
      var selector = 'input:[value="?"]';
      var submit = $(selector.replace(/\?/, args[0]));
      if(submit.length > 0) {
        submit.click();
        return true;
      } else {
        return false;
      }
    },
    Select: function(args) {
      var label = this.get_label(args[1]);
      var selector = 'select:[id=?] option:contains("2")';
      if(label.length > 0) {
        var option = $(selector.replace(/\?/,label.attr('for')).replace(/2/, args[0]));
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
    Check: function(args) {
      var label = this.get_label(args[0]);
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
    UnCheck: function(args) {
      var label = this.get_label(arg[0]);
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
    Choose: function(args) {
      var label = this.get_label(args[0]);
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
      var selector = 'label:visible:contains("?")';
      return $(selector.replace(/\?/,name));
    },
    run_step: function(instruction) {
      var fired = false;
      /* Find Test by Instruction */
      for(i = 0; i < Steps.length; i++) {
        var args = instruction.match(Steps[i].instruction);
        if (args != null) {
          fired = true;
          args.splice(0,1);
          if(Steps[i].test(args)) {
            console.info("Step Passed: ", instruction);
            return true;
          } else {
            console.error("Step Failed: ", instruction);
            //throw "Step Failed:" + instruction;
            return false;
          }
          
        }
      }
      if(!fired) {
        console.log("Step UnDefined: " + instruction);
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

