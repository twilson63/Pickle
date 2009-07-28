var FeatureTest = {
  run_sample: function () {
    try {
      $('body').html();
      Pickle().RunScenario('MyTest','Sample');
      console.log("Test Valid");
    } catch(err) {
      console.log("Test Failed: " + err);
    }
  },
  run_sample2: function () {
    try {
      $('body').html();
      Pickle().RunScenario('MyTest','Sample2');
      console.log("Test Valid");
    } catch(err) {
      console.log("Test Failed: " + err);
    }
  }
  
}