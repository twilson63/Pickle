var TestSelect = {
  Select: function () {
    $('body').html();
    $('body').append(
      jLabel('color', 'Pick your favorite color') + br +
      jSelect('color', ['Red', 'Green', 'Blue', 'Other'])  
    );
    Pickle().Select("Blue", "Pick your favorite color");
    if($('#color').val() == "Blue") {
      console.log("Test Valid");
    } else {
      console.log("Test Failed");
    }
    
  }
}