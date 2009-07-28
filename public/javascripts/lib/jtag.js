/*
* Tag JavaScript Library v0.3.0
* http://tag.jackhq.com
*
* Copyright (c) 2009 Jack Russell Software Company, LLC
* Licensed under the MIT license.
* http://github.com/twilson63/jtag/License
*
* Date: 2009-06-24 23:43:21 -0500 (Wed, 24 June 2009)
* Revision: 00003
*/


// Common Tags
var 

h1 = "<h1>?</h1>",
h2 = "<h2>?</h2>",
h3 = "<h3>?</h3>",
h4 = "<h4>?</h4>",
h5 = "<h5>?</h5>",
h6 = "<h6>?</h6>",
p = "<p>?</p>",
br = "<br />",
hr = "<hr />",
ul = "<ul>?</ul>",
li = "<li>?</li>",
a = "<a>?</a>",
div = "<div>?</div>",
span = "<span>?</span>",
input = "<input>?</input>",
textarea = "<textarea>?</textarea>",
select = "<select>?</select>",
option = "<option>?</option>",
label = "<label>?</label>",
form = "<form>?</form>",
table = "<table>?</table>",
thead = "<thead>?</thead>",
tr = "<tr>?</tr>",
tbody = "<tbody>?</tbody>",
td = "<td>?</td>",
th = "<th>?</th>",
form = "<form>?</form>",
fieldset = "<fieldset>?</fieldset>",
legend = "<legend>?</legend>",
space = " ";

(function(){
  var 
    window = this,
    undefined,
    _jTag = window.jTag,

    jTag = window.jTag = function( tag, text, args ) {
      return jTag.fn.init( tag, text, args )
    };

  jTag.fn = jTag.prototype = {
    init: function( tag, text, args ) {
      if (args) {
        val = tag.replace(/>\?/, " " + args + ">\?")
        val = val.replace(/\?/, text);
      } else {
        val = tag.replace(/\?/, text);
      }
      return val;
    }
  }

  var 
    _jAttribute = window.jAttribute,
    jAttribute = window.jAttribute = function( attr, value ) {
      return "a='b'".replace(/a/, attr).replace(/b/, value); 
    },

    _jInput = window.jInput,
    jInput = window.jInput = function( name, value, type, args ) {
    	return jTag(input, "", 
    	  [ 
    	  jAttribute("id", type == "radio" ? [name,value].join('_') : name),
    	  jAttribute("name", name), 
    	  jAttribute("value", value || ""), 
    	  jAttribute("type", type),
    	  args || ""
    	  ].join(' '));

    },
    
    _jLink = window.jLink,
    jLink = window.jLink = function( name, value, href, args ) {
      return jTag("<a>?</a>", value, [jAttribute("id", name), jAttribute("href", href || "#"), args || ""].join(' '));
    },
    
    _jSubmit = window.jSubmit,
    jSubmit = window.jSubmit = function( name, value ) {
      return jInput(name, value || "Submit", "submit");
    },
    _jReset = window.jReset,
    jReset = window.jReset = function( name, value ) {
      return jInput(name, value || "Reset", "reset");
    },

    _jText = window.jText,
    jText = window.jText = function( name, value ) {
      return jInput(name, value, "text");
    },
    _jLabel = window.jLabel,
    jLabel = window.jLabel = function( name, value, args ) {
      return jTag(label, value, jAttribute("for", name) + (args || ""));
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
      return jTag(textarea, value || "", [attr || "", jAttribute("id", name)].join(' ') );
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
            options += jTag(option, values[i].name, jAttribute("value", values[i].id));
        } else {
            options += jTag(option, values[i], jAttribute("value", values[i]));
        }
      }
      return jTag(select, options, [args || "", jAttribute("id", name)].join(' '));
    };

    _jDiv = window.jDiv,
    jDiv = window.jDiv = function( arg1, arg2, arg3, arg4 ) {
      id = "";
      classes = [];
      innerHtml = "";
      attributes = "";
    
      if(typeof(arg1) == "object") {
        classes = arg1;
        innerHtml = arg2;
        attributes = arg3;
      }
      else if(typeof(arg1) == "string") {
        id = arg1;
        if (typeof(arg2) == "object") {
          classes = arg2;
          innerHtml = arg3;
          attributes = arg4;
        } else {
          innerHtml = arg2;
          attributes = arg3;
        }
      }
      
      classes = jAttribute("class", classes.join(' '));
      id = jAttribute("id", id);
      
      return jTag(div, innerHtml, [attributes || "", classes, id].join(' '));
    },
    _jTable = window.jTable, 
    jTable = window.jTable = function (headers, data, args) {
      header_markup = "";
      for(i = 0; i < headers.length; i++) {
        header_markup += jTag(th, headers[i]);
      }
      rows = "";
      for(i = 0; i < data.length; i++) {
        rows += jTag(tr, function () {
          columns = "";
          for(y = 0; y < data[i].length; y++) {
            columns += jTag(td, data[i][y]);
          }
          return columns;
        });
      }
      return jTag(table, 
        jTag(thead, jTag(tr, header_markup)) +
        jTag(tbody, rows)
        , args || "")
      
    }
    
})();
