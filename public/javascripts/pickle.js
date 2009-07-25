/*!
 * Pickle JavaScript Library v0.0.2
 * http://pickle.jackhq.com/
 *
 * Copyright (c) 2009 Jack Russell Software Company, LLC
 * Licensed under the MIT licenses.
 * http://www.jackhq.com/License
 *
 * Date: 2009-07-24 14:23:21 -0500 (Fri, 24 July 2009)
 * Revision: 1
 */


// Common Pickle Step Definitions

Pickle.AddStep( {
  instruction: /^I should see (.*)$/,
  test: function (arg) {
    return Pickle.Contains(arg);
  }
});


Pickle.AddStep( {
  instruction: /^I follow (.*)$/,
  test: function (arg) {
    return Pickle.Click(arg);
  }
});

Pickle.AddStep(  {
  instruction: /^I fill in (.*) with (.*)$/,
  test: function (arg, arg2) {
    return Pickle.SetText(arg, arg2)
    
  }
  
});

Pickle.AddStep( {
  instruction: /^I press (.*)$/,
  test: function (arg) {
    return Pickle.PressButton(arg);
  }
});

Pickle.AddStep(  {
  instruction: /^I select "([^\"]*)" from "([^\"]*)"$/,
  test: function (arg, arg2) {
    return Pickle.Select(arg, arg2);
  }
});

Pickle.AddStep(  {
  instruction: /^I check "([^\"]*)"$/,
  test: function (arg) {
    return Pickle.Check(arg);
  }
});

// Basic Test Functions

(function(){
  
	var
		window = this,
		undefined,
		_Pickle = window.Pickle,
		Pickle = window.Pickle = function() {
			return Goldfish.fn.init();
		}
	
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
  
	Pickle.fn = Pickle.prototype = {
    init: function() {
      return Pickle.fn;
    },
    AddStep: function (obj) {
      Steps[Steps.length] = obj;
    },
    
    Contains: function(arg) {
      regexpression = new RegExp(arg);
      if($("body").html().match(regexpression) == null) {
        return false;
      } else {
        return true;
      }
    },
    Click: function(arg) {
      if($('a:contains("' + arg + '")').length == 0 ) {
        return false;
      } else {
        $('a:contains("' + arg + '")').click();
        return true;
      }
    },
    SetText: function(arg, arg2) {
      label = $('label:contains("' + arg + '")');
      if(label.length > 0) {  
        c = $('input:[id=' + label.attr('for') + ']');
        if(c.length > 0 ) {
          c.val(arg2);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    PressButton: function(arg) {
      obj = $('input:[value="' + arg + '"]');
      if(obj.length > 0) {
        obj.click();
        return true;
      } else {
        return false;
      }
    },
    Select: function(arg, arg2) {
      label = $('label:contains("' + arg2 + '")');
      if(label.length > 0) {  
        c = $('select:[id=' + label.attr('for') + '] option:contains("' + arg + '")');
        if(c.length > 0 ) {
          c[0].selected = true;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    Check: function(arg) {
      label = $('label:contains("' + arg + '")');
      if(label.length > 0) {  
        c = $('checkbox:[id=' + label.attr('for') + ']');
        if(c.length > 0 ) {
          c.attr('checked','true');
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }

    },

    UnCheck: function(arg) {
      label = $('label:contains("' + arg + '")');
      if(label.length > 0) {  
        c = $('checkbox:[id=' + label.attr('for') + ']');
        if(c.length > 0 ) {
          c.attr('checked','false');
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }

    },

    Choose: function(arg) {
      label = $('label:contains("' + arg + '")');
      if(label.length > 0) {  
        c = $('radio:[id=' + label.attr('for') + ']');
        if(c.length > 0 ) {
          c.attr('checked','true');
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }

    }    
	  
	}
  






});