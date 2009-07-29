var TestGetLabel = {
  Run: function () {
    $('body').html();
    $('body').append(
      jDiv("myDiv",
        jLabel("frequency_code2", "Frequency") + br + jText("frequency_code2"),
        jAttribute("style","display:none;")
      )
    );
    
    $('body').append(jLabel("frequency_code", "Frequency") + br + jText("frequency_code"));

    if(Pickle().get_label("Frequency").attr('for') ==  "frequency_code") {
      console.log("Test Valid");
    } else {
      console.log("Test Failed");
    }
    
  }
}