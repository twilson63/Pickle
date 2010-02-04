// ==UserScript==
// @name          Pickle
// @namespace     http://pickle.github.com
// @description	  Test you single page app using Behavior Driven Development
// @author        Tom Wilson
// @homepage      http://pickle.github.com
// @include       http://test.eirene.net/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.js
// @require       http://jackhq.s3.amazonaws.com/pickle.js
// @require       http://jackhq.s3.amazonaws.com/basic_steps.js
// ==/UserScript==

alert('hello world');
// var GetElementByExactContents = function(selector, contents) {
//   var elements = $(selector);
//   var found_element = undefined;
//   
//   $.each(elements, function() {
//    if ($(this).text().trim() == contents) {
//      found_element = $(this)
//    }
//   });
//   
//   return found_element;
//   
// }
// 
// Pickle('step', /^I follow "([^\"]*)" exactly$/, function (a) {
//   var link = GetElementByExactContents('a:contains("?")'.replace(/\?/, a), a);
//   if (link) {
//     $(link).click();
//     return true;
//   } else {
//     return false;
//   }
// });
// 
// Pickle('feature', 'test', function () {
//   Scenario('default', function () {
//     And('I should see "Check Out"');
//     And('I follow "Check Out" exactly');
//   });
// });
// 
// 
// $(document).ready(function(){
//   //alert('Hello');
// 
//   Pickle('test');
// 
// 
// });
// 
