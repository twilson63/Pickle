/*
* Pickle JavaScript Library v0.5.0
* http://pickle.jackhq.com
*
* Copyright (c) 2009 Jack Russell Software Company, LLC
* Licensed under the MIT license.
* http://github.com/twilson63/pickle/License
*
* Date: 2009-09-19 
* Revision: 00005
*/
(function(){
  var
    window = this,
    undefined,
    _Pickle = window.Pickle,
    Pickle = window.Pickle = function () {
      if(arguments.length == 0) {
        return Pickle.fn;
      } else if (arguments.length == 1 && arguments[0] == "run") {
        return Pickle.fn.run();
      } else if (arguments.length == 1) {
        return Pickle.fn.run(arguments[0]);
      } else if (arguments.length == 2) {
        return Pickle.fn.run(arguments[0], arguments[1]);
      } else if (arguments.length == 3) {
        return Pickle.fn[arguments[0]](arguments[1],arguments[2]);        
      }
    }
  Pickle.fn = Pickle.prototype = {
    Specifications: {
      Scenario: function (name, fn) {
        var contents = String(fn).match(/^[^\{]*{((.*\n*)*)}/m)[1];
        var fn = new Function(
          "with (Pickle().Specifications) { " + contents + " }"
        );
        Pickle().features[Pickle().features.length - 1].scenarios[Pickle().features[Pickle().features.length - 1].scenarios.length] = {
          name: name,
          body: fn
        }
      },
      Given: function() {
        Pickle().run_step(arguments[0]);
      },
      When: function() {
        Pickle().run_step(arguments[0]);
      },
      Then: function() {
        Pickle().run_step(arguments[0]);
      },
      And: function() {
        Pickle().run_step(arguments[0]);
      }
    },
    features: [],
    steps: [],
    results: [],
    feature: function (name, fn) {
      var contents = String(fn).match(/^[^\{]*{((.*\n*)*)}/m)[1];
      var fn = new Function(
        "with (Pickle().Specifications) { " + contents + " }"
      );
      Pickle.fn.features[Pickle.fn.features.length] = {
        name: name,
        scenarios: []
      };      
      fn();
      return this.features;
    },
    step: function() {
      Pickle.fn.steps[Pickle.fn.steps.length] = {
        instruction: arguments[0],
        test: arguments[1]
      };            
    },
    run: function() {
      this.results = [];
      for(var i = 0; i < this.features.length; i++) {
        if(arguments[0] == undefined || arguments[0] == this.features[i].name) {
          this.results[this.results.length] = "Feature: " + this.features[i].name; 
          for(var y = 0; y < this.features[i].scenarios.length; y++) {
            if (arguments[1] == undefined || arguments[1] == this.features[i].scenarios[y].name) {
              this.results[this.results.length] = "Scenario: " +  this.features[i].scenarios[y].name;           
              this.features[i].scenarios[y].body();
              if(arguments[1] == this.features[i].scenarios[y].name) { break; }
            }
          }            
          if(arguments[0] == this.features[i].name) { break; }
        }
      }   
      if (console != undefined) {
        for(var s = 0; s < this.results.length; s++) {
          console.log(this.results[s]);
        }
      }     
      return this.results;
    },
    run_step: function() {
      var fired = false;
      for(i = 0; i < this.steps.length; i++) {
        var args = arguments[0].match(this.steps[i].instruction);
        if (args != null) {
          fired = true;
          args.splice(0,1);
          if(this.steps[i].test(args)) {
            this.results[this.results.length] = ["Step Passed:", arguments[0]].join(' ');
            return true;
          } else {
            this.results[this.results.length] = ["Step Failed:", arguments[0]].join(' ');
            //console.error("Step Failed: ", instruction);
            //throw "Step Failed:" + instruction;
            return false;
          } 
        }
      }
      if(!fired) {
        this.results[this.results.length] = ["Step Undefined:", arguments[0]].join(' ');
      }   
    }
  }
    
})();

