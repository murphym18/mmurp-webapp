var mergeTrees = require('broccoli-merge-trees');
var babel = require('broccoli-babel-transpiler');
var browserify = require('broccolify');
var shim = require('browserify-shim');
var concat = require('broccoli-concat');
var uglifyJavaScript = require('broccoli-uglify-js');
var funnel = require('broccoli-funnel');
var env = require('broccoli-env').getEnv();
var fs = require('fs');
var path = require('path');

var commonModules = ['jquery', 'bootstrap-sass'];
// var libsArray = commonModules.map(function(f){
//    return path.relative(__dirname, require.resolve(f));
// });
//
// var common = concat('.', {
//   inputFiles: libsArray,
//   outputFile: '/common.js',
//   separator: '\n', // (optional, defaults to \n)
//   wrapInEval: false, // (optional, defaults to false)
//   wrapInFunction: false, // (optional, defaults to true)
//   header: (require("babel").buildExternalHelpers())
// });
//
// common = uglifyJavaScript(common)

var app = babel('app', {
   stage: 0,
   modules: 'common',
   sourceMaps: 'inline',
   externalHelpers: true
});

app = browserify(app, {
   entries: ['./index'],
   outputFile: 'bundle.js',
   transform: [shim],
   browserify: {
      debug: env !== 'production'
   }
});

if (env === 'production') {
   app = uglifyJavaScript(app);
}

var out = funnel('out');
module.exports = mergeTrees([out, app]); //mergeTrees([app, libs, css, html, meta]);
