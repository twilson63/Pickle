/*
* Tag JavaScript Library v0.6.0
* http://tag.jackhq.com
*
* Copyright (c) 2009 Jack Russell Software Company, LLC
* Licensed under the MIT license.
* http://github.com/twilson63/jtag/License
*
* Date: 2009-06-24 23:43:21 -0500 (Wed, 24 June 2009)
* Revision: 0010
*/


// Common Tags
var 
_hr = "<hr />",
_br = "<br />",
_space = " ";

(function(){
  var 
    window = this,
    undefined,
    _jTag = window.jTag,

    jTag = window.jTag = function( tag, text, attributes ) {
      return jTag.fn.init( tag, text, attributes )
    };

  jTag.fn = jTag.prototype = {
    init: function( tag, text, attributes ) {
      if(typeof(tag) != "string") {
        throw "tag must be of type string not:" + typeof(tag) + " text is:" + text;
      }
      
      if (tag.match(/h[1-6]|p|div|span|ul|li|input|form|fieldset|legend|label|a|textarea|select|option|br|hr|table|tbody|thead|td|th|tr|big/i) == null) {
        throw "tag must be a valid html symbol: not " + tag;
      }
       
      
      if (attributes) {
        if(typeof(attributes) == "string") {
          attributes = [attributes];
        }
        val = "<x>?</x>".replace(/x/g,tag).replace(/>\?/, " " + attributes.join(' ') + ">\?");
        val = val.replace(/\?/, text);
      } else {
        val = "<x>?</x>".replace(/x/g,tag).replace(/\?/, text);
      }
      return val;
    }
  }

  var 
    _jAttribute = window.jAttribute,
    jAt = window.jAt = jAttribute = window.jAttribute = function( attr, value ) {
      return "a='b'".replace(/a/, attr).replace(/b/, value); 
    },

    _jInput = window.jInput,
    jInput = window.jInput = function( name, value, type, args ) {
    	return jTag("input", "", 
    	  [ 
    	  jAt("id", type == "radio" ? [name.split('[').join('_').replace(/\]/g,''),value].join('_') : name.split('[').join('_').replace(/\]/g,'')),
    	  jAt("name", name), 
    	  jAt("value", value || ""), 
    	  jAt("type", type),
    	  args || ""
    	  ]);

    },
    
    _jLink = window.jLink,
    jLink = window.jLink = function( value, href, args ) {
      return jTag("a", value, [jAt("href", href || "#"), args || ""]);
    },
    
    _jSubmit = window.jSubmit,
    jSubmit = window.jSubmit = function( name, value, args ) {
      return jInput(name, value || "Submit", "submit", args);
    },
    _jReset = window.jReset,
    jReset = window.jReset = function( name, value, args ) {
      return jInput(name, value || "Reset", "reset", args);
    },

    _jText = window.jText,
    jText = window.jText = function( name, value, args ) {
      return jInput(name, value, "text", args || "");
    },
    _jLabel = window.jLabel,
    jLabel = window.jLabel = function( name, value, args ) {
      return jTag("label", value, jAt("for", name.split('[').join('_').replace(/\]/g,'')) + _space + (args || ""));
    };
    _jHidden = window.jHidden,
    jHidden = window.jHidden = function( name, value ) {
      return jInput(name, value, "hidden");
    };
    _jRadio = window.jRadio,
    jRadio = window.jRadio = function( name, value, args ) {
      return jInput(name, value, "radio", args);
    };
    _jArea = window.jArea,
    jArea = window.jArea = function( name, value, attr ) {
      return jTag("textarea", value || "", [attr || "", jAt("id", name.split('[').join('_').replace(/\]/g,'')), jAt("name", name)].join(' ') );
    };
    _jCheck = window.jCheck,
    jCheck = window.jCheck = function( name, value, args ) {
      return jInput(name, value, "checkbox", args)
    };

    _jSelect = window.jSelect,
    jSelect = window.jSelect = function( name, values, args ) {
      options = "";
      for(i = 0; i < values.length; i++) {
        if(values[i].id && values[i].name) {
            options += jTag("option", values[i].name, jAt("value", values[i].id));
        } else {
            options += jTag("option", values[i], jAt("value", values[i]));
        }
      }
      return jTag("select", options, [args || "", jAt("id", name.split('[').join('_').replace(/\]/g,'')), jAt("name",name)]);
    };

    _jDiv = window.jDiv,
    jDiv = window.jDiv = function() {
      id = "";
      classes = [];
      innerHtml = "";
      attributes = "";
    
      if(arguments.length == 1 && typeof(arguments[0]) == "string") {
        innerHtml = arguments[0];
      } else if(arguments.length >= 1 && typeof(arguments[0]) == "object") {
        classes = arguments[0];
        innerHtml = arguments[1];
        attributes = arguments[2];
      } else if(arguments.length > 1 && typeof(arguments[0]) == "string") {
        id = arguments[0];
        if (typeof(arguments[1]) == "object") {
          classes = arguments[1];
          innerHtml = arguments[2];
          attributes = arguments[3];
        } else {
          innerHtml = arguments[1];
          attributes = arguments[2];
        }
      }
      
      classes = jAt("class", classes.join(' '));
      id = jAt("id", id);
      
      return jTag("div", innerHtml, [attributes || "", classes, id]);
    },
    _jTable = window.jTable, 
    jTable = window.jTable = function (headers, data, args) {
      header_markup = "";
      for(i = 0; i < headers.length; i++) {
        header_markup += jTag("th", headers[i]);
      }
      rows = "";
      for(i = 0; i < data.length; i++) {
        rows += jTag("tr", function () {
          columns = "";
          for(y = 0; y < data[i].length; y++) {
            columns += jTag("td", data[i][y]);
          }
          return columns;
        });
      }
      return jTag("table", 
        jTag("thead", jTag("tr", header_markup)) +
        jTag("tbody", rows)
        , args || "");
      
    },
    _jList = window.jList,
    jList = window.jList = function (items, attributes) {
      var line_items = "";
      if(typeof(items) == "string"){
        items = items.split(',');
      }
      
      for(i = 0; i < items.length; i++) {
        line_items += jTag("li", items[i]);
      }
      
      return jTag("ul", line_items, attributes || "");
    }
    
})();
