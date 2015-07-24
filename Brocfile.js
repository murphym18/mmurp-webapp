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

var dist = [];
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

if (env !== 'production') {
   var liveReload = babel('bin', {
      stage: 0,
      modules: 'common',
      sourceMaps: 'inline',
      externalHelpers: true
   });
   liveReload = browserify(liveReload, {
      entries: ['./live-reload-client.js'],
      outputFile: 'live-reload.js',
      browserify: {
         debug: true
      }
   });
   dist.push(liveReload);
}
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
dist.push(app);
dist.push(funnel('out'));
module.exports = mergeTrees(dist); //mergeTrees([app, libs, css, html, meta]);
