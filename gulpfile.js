var babel = require("gulp-babel");
var config = require('./package.json')['gulp'];
var del = require('del');
var exec = require('child_process').exec;
var fs = require('fs');
var gulp = require('gulp');
var handlebars = require('handlebars');
var mainBowerFiles = require('main-bower-files');
var notify = require('gulp-notify');
var path = require('path');
var preprocess = require('gulp-preprocess');
var rjs = require("gulp-rjs");
var sass = require('gulp-ruby-sass') ;
var shell = require('gulp-shell');

gulp.task('default', ['build-js', 'copy-libs'])

gulp.task('build-js', function() {
   return gulp.src(config['babel-src-globs'])
      .pipe(preprocess(config['preprocessor-config']))
      .pipe(babel(config['babel-config']))
      .pipe(gulp.dest(config['out-directory']));
});

gulp.task('build-css', function() { 
   var errCb = function(error) { 
      return "Error: " + error.message; 
   }

   var sassProcessor = sass(config['sass-config']) ;
   sassProcessor = sassProcessor.on("error", notify.onError(errCb));

   return gulp.src(config['sass-src-globs']) 
      .pipe(sassProcessor)  
      .pipe(gulp.dest(config['out-directory'] + '/css')); 
});

gulp.task('copy-fonts', function() { 
   return gulp.src('./bower_components/fontawesome/fonts/**.*') 
      .pipe(gulp.dest(config['out-directory'] + '/fonts')); 
});

gulp.task('copy-libs', function() {
   return gulp.src(mainBowerFiles())
      .pipe(gulp.dest(config['out-directory']))
});

gulp.task('bundle-amd', ['build-js', 'copy-libs'], function(cb) {
   var rjsConfig = config['requirejs-config'];
   var configTemplate = handlebars.compile(JSON.stringify(rjsConfig));
   var configStr = '(' + configTemplate(config) + ')'
   var configFile = path.join('.', config['out-directory'], 'requirejs-config.js');
   var rjs = path.normalize('./node_modules/requirejs/bin/r.js');

   fs.writeFileSync(configFile, configStr);
   exec('node ' + rjs + ' -o ' + configFile, function(err, stdout,
      stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
   });
});

gulp.task('clean', function(cb) {
   del([config['out-directory']], cb)
});
