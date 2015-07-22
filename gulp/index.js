require('./tasks/sass');
require('./tasks/clean');
require('./tasks/jade');
require('./tasks/favicons');
require('./tasks/meta');
require('./tasks/browserify');
require('./tasks/watchify');

var config = require('./config');

var watchify = require('watchify');

var gulp = require('gulp');

var gutil = require('gulp-util');






// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('build', ['jade', 'sass', 'browserify', 'meta'], function(cb) {
   var files = [config['tmp-directory'] + '/index.html', config[
      'tmp-directory'] + '/bundle.js.map'];
   return gulp.src(files)
      .pipe(gulp.dest(config['out-directory']));
});

 // so you can run `gulp js` to build the file
