var config = require('./package.json')['gulp'];
var gulp = require('gulp');
var babel = require("gulp-babel");
var preprocess = require('gulp-preprocess');
var del = require('del');
var rjs = require("gulp-rjs");

gulp.task('default', function() {
   return gulp.src("app/**/*.js")
      .pipe(preprocess({context: config.defines}))
      .pipe(babel(config.babel))
      .pipe(gulp.dest("dist"));
});

gulp.task('package-js', function() {
   return gulp.src("dist/config.js")
      .pipe(preprocess({context: config.defines}))
      .pipe(babel(config.babel))
      .pipe(gulp.dest("dist"))
      .pipe(rjs({baseUrl:'dist'}));
});

gulp.task('clean', function(cb) {
    del(['dist'], cb)
});
