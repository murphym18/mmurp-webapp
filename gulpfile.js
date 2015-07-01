var config = require('./package.json')['gulp'];
var gulp = require('gulp');
var babel = require("gulp-babel");
var preprocess = require('gulp-preprocess');
var del = require('del');
var rjs = require("gulp-rjs");
var mainBowerFiles = require('main-bower-files');
var shell = require('gulp-shell');
var exec = require('child_process').exec;
var path = require('path');
var sass = require('gulp-ruby-sass') ;

gulp.task('default', ['build', 'copy-libs'])

gulp.task('build', function() {
   return gulp.src("app/**/*.js")
      .pipe(preprocess({
         context: config.defines
      }))
      .pipe(babel(config.babel))
      .pipe(gulp.dest("dist"));
});

gulp.task('css', function() { 
   return gulp.src(config.sassPath + '/style.scss') .pipe(sass({ 
         style: 'compressed',
 loadPath: [ config.sassPath, config.bowerDir +
            '/bootstrap-sass-official/assets/stylesheets', 
            config.bowerDir + '/fontawesome/scss' 
         ] 
      }) 
      .on("error", notify.onError(function(error) { 
         return "Error: " + error.message; 
      })))  .pipe(gulp.dest('./dist/css')); 
});

gulp.task('icons', function() { 
   return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
      .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('copy-libs', function() {
   return gulp.src(mainBowerFiles())
      .pipe(gulp.dest('dist'))
});

gulp.task('r.js', ['build', 'copy-libs'], function(cb) {
   var rjs = path.normalize('./node_modules/requirejs/bin/r.js');
   exec('node ' + rjs + ' -o requirejs.build.js', function(err, stdout,
      stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
   });
});

gulp.task('clean', function(cb) {
   del(['dist'], cb)
});
