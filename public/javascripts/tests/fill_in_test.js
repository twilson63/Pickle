var TestFillIn = {
  InputText: function () {
    
  },
  TextArea: function () {
    $('body').html();
    $('body').append(jLabel("my_textarea", "Text Area") + br + jArea("my_textarea"));
    Pickle().SetText(["Text Area", "Hello World"]);
    if($('#my_textarea').val() == "Hello World") {
      console.log("Test Valid");
    } else {
      console.log("Test Failed");
    }
    
  }
}