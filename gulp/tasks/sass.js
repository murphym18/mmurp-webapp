'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config');
var path = require('path');
var pubdir = config['pub-directory'];
var tmpdir = config['tmp-directory'];
var bootstrap = require.resolve('bootstrap-sass');
var bootstrapFonts = path.resolve(path.dirname(bootstrap), '../fonts');
var bootstrapPath = path.resolve(path.dirname(bootstrap), '../stylesheets');
var fontAwesome = path.resolve(__dirname, '../../node_modules/font-awesome');

var options = {
   includePaths: [
      bootstrapPath,
      path.resolve(bootstrapPath, 'bootstrap'),
      // path.resolve(fontAwesome, 'scss')
   ],
   outputStyle: 'compressed'
};

gulp.task('sass', ['fonts'], function (cb) {
   return gulp.src([path.resolve(pubdir, '**/*.sass')])
      .pipe(sass(options))
      .pipe(gulp.dest(tmpdir), cb);
});

gulp.task('fonts', function (cb) {
   return gulp.src([bootstrapFonts + '/**/*', fontAwesome + '/fonts/**/*'])
      .pipe(gulp.dest(config['out-directory'] + '/fonts'));
});
