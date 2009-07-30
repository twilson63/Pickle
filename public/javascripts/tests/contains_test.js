var TestContains = {
  Run: function () {
    $('body').html();
    $('body').append("2009 - MUSC (ICU) for Chest Pains");
    if(Pickle().Contains(["2009 - MUSC (ICU) for Chest Pains"])) {
      console.log("Test Valid");
    } else {
      console.log("Test Failed");
    }
    
  }
}