var uglify = require('gulp-uglify');
var options = {
   mangle: true,
   output: {
      indent_start: 0, // start indentation on every line (only when `beautify`)
      indent_level: 3, // indentation level (only when `beautify`)
      quote_keys: false, // quote all keys in object literals?
      space_colon: true, // add a space after colon signs?
      ascii_only: false, // output ASCII-safe? (encodes Unicode characters as ASCII)
      inline_script: false, // escape "</script"?
      width: 80, // informative maximum line width (for beautified output)
      max_line_len: 32000, // maximum line length (for non-beautified output)
      beautify: false, // beautify output?
      source_map: true, // output a source map
      bracketize: false, // use brackets every time?
      comments: false, // output comments?
      semicolons: true, // use semicolons to separate statements? (otherwise, new
   }
}

module.exports = function() {
   return uglify(options);
}
