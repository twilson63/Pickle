var FeatureTest = {
  run_sample: function () {
    try {
      $('body').html();
      Pickle().Run('MyTest','Sample');
      console.log("Test Valid");
    } catch(err) {
      console.log("Test Failed: " + err);
    }
  },
  run_sample2: function () {
    try {
      $('body').html();
      Pickle().Run('MyTest','Sample2');
      console.log("Test Valid");
    } catch(err) {
      console.log("Test Failed: " + err);
    }
  },
  test_fill_in_step: function () {
    
  },
  run_all: function () {
    Pickle().RunAll();
    
  }
  
  
}