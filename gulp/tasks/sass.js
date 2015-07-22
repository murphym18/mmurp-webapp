'use strict';
var _ = require('underscore');
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

function SassOptions() {
   this.includePaths = Array.prototype.slice.call(arguments);
   this.outputStyle = 'compressed';
};

gulp.task('sass', ['sass-bootstrap', 'sass-font-awesome']);

gulp.task('sass-bootstrap', ['sass-fonts'], function (cb) {
   var path2 = path.resolve(bootstrapPath, 'bootstrap')
   var options = new SassOptions(bootstrapPath, path2);
   return gulp.src([path.resolve(pubdir, 'sass/app-bootstrap.sass')])
      .pipe(sass(options))
      .pipe(gulp.dest(tmpdir), cb);
});

gulp.task('sass-font-awesome', ['sass-fonts'], function (cb) {
   var options = new SassOptions(path.resolve(fontAwesome, 'scss'));
   return gulp.src([path.resolve(pubdir, 'sass/app-font-awesome.sass')])
      .pipe(sass(options))
      .pipe(gulp.dest(tmpdir), cb);
});

gulp.task('sass-fonts', function (cb) {
   return gulp.src([bootstrapFonts + '/**/*', fontAwesome + '/fonts/**/*'])
      .pipe(gulp.dest(config['out-directory'] + '/fonts'));
});
