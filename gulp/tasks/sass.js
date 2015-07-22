'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config');
var path = require('path');
var pubdir = config['pub-directory'];
var tmpdir = config['tmp-directory'];
var bootstrap = require.resolve('bootstrap-sass');
var bootstrapPath = path.resolve(path.dirname(bootstrap), '../stylesheets');

var options = {
   includePaths: [bootstrapPath, bootstrapPath+'/bootstrap'],
   outputStyle: 'compressed'
};

gulp.task('sass', function (cb) {
   return gulp.src([path.resolve(pubdir, '**/*.sass')])
      .pipe(sass(options))
      .pipe(gulp.dest(tmpdir), cb);
});
