var TestNoStep = {
  Run: function () {
    
    try {
      $('body').html();
      Given('This Step is not defined');
      
      console.log("Test Valid");
    } catch(err) {
      console.log("Test Failed: " + err);
    }
    
    Pickle().Step({
      instruction: /^My Step$/,
      test: function () {
        return true;
      }
    });
    
    Given('My Step');
    
  }
}