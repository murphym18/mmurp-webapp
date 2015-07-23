require('./tasks/sass');
require('./tasks/clean');
require('./tasks/jade');
require('./tasks/meta');
require('./tasks/browserify');
require('./tasks/watchify');

var config = require('./config');
var watchify = require('watchify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var _ = require('underscore');

gulp.task("build-common-lib", function() {
   var libs = config['common-libs'];
   var paths
});

gulp.task('build', ['jade', 'sass', 'browserify', 'meta'], function(cb) {
   var files = [config['tmp-directory'] + '/index.html', config[
      'tmp-directory'] + '/bundle.js.map'];
   return gulp.src(files)
      .pipe(gulp.dest(config['out-directory']));
});
