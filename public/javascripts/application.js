$(document).ready(function () {
  // When Run Pickle is Clicked Run Code in 
  // TextArea
  $('input:[id=pickle_button]').click(function(){
    eval($('textarea:[id=pickle_text]').val());
    $('textarea:[id=pickle_text]').val("");
  });
  
  
  
});
