var jslint = require('gulp-jslint');

var options = {
   // these directives can
   // be found in the official
   // JSLint documentation.
   node: true,
   evil: true,
   nomen: true,

   // you can also set global
   // declarations for all source
   // files like so:
   global: [],
   predef: [],
   // both ways will achieve the
   // same result; predef will be
   // given priority because it is
   // promoted by JSLint

   // pass in your prefered
   // reporter like so:
   reporter: 'default',
   // ^ there's no need to tell gulp-jslint
   // to use the default reporter. If there is
   // no reporter specified, gulp-jslint will use
   // its own.

   // specifiy custom jslint edition
   // by default, the latest edition will
   // be used
   edition: '2014-07-08',

   // specify whether or not
   // to show 'PASS' messages
   // for built-in reporter
   errorsOnly: false
}

module.exports = function() {
   return jslint(options);
}
