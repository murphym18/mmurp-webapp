var mergeTrees = require('broccoli-merge-trees');
var babel = require('broccoli-babel-transpiler');
var browserify = require('broccolify');
var shim = require('browserify-shim');
var renderTemplates = require("broccoli-render-template");
var consolidate = require('consolidate');
var uglifyJavaScript = require('broccoli-uglify-js');
var changeExtension = require('broccoli-change-extension');
var funnel = require('broccoli-funnel');
var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');
var _ = require('underscore');
var env = _.contains(process.argv, "production") ? 'production' : "development";
var compileSass = require('broccoli-sass');
var dist = [];

var html = renderTemplates('public/jade', {
   live_reload: env !== 'production'
});
dist.push(funnel(html, {
   exclude: ['ie8-unsupported.html', 'favicons.html', 'page.html']
}));

Handlebars.registerHelper('include_js', function(lib, options) {
   return fs.readFileSync(require.resolve(lib));
});

var libs = renderTemplates('public/libs', {
   babel_ext: require("babel").buildExternalHelpers(),
});
libs = changeExtension(libs, {
   inputExtension: '.html',
   outputExtension: ''
});
dist.push(libs);

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
   browserify: {
      debug: env !== 'production'
   }
});

if (env === 'production') {
   app = uglifyJavaScript(app);
}
dist.push(app);

var sassPath = 'node_modules/bootstrap-sass/assets/stylesheets';
var bootstrapCss = compileSass(['public/sass', sassPath, (sassPath + '/bootstrap')], '/app-bootstrap.sass', '/app-bootstrap.css');
dist.push(bootstrapCss);
dist.push(funnel('node_modules/bootstrap-sass/assets', {
   srcDir: 'fonts',
   destDir: 'fonts'
}));

var fontAwesomePath = 'node_modules/font-awesome';
var fontAwesomeCss = compileSass(['public/sass', (fontAwesomePath + '/scss')], '/app-font-awesome.sass', '/app-font-awesome.css');
dist.push(fontAwesomeCss);
dist.push(funnel(fontAwesomePath, {
   srcDir: 'fonts',
   destDir: 'fonts'
}));
dist.push(funnel('public/meta/favicons', {
   srcDir: ['/green', '/gray', '/orange', '/blue', '/darkblue'][Math.floor(Math.random()*5)],
   destDir: '/'
}))
module.exports = mergeTrees(dist, {overwrite: true}); //mergeTrees([app, libs, css, html, meta]);
