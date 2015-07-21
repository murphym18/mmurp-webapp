'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config');
var path = require('path');
var appdir = config['app-directory'];
var outdir = config['out-directory'];
var bootstrap = require.resolve('bootstrap-sass');
var bootstrapPath = path.resolve(path.dirname(bootstrap), '../stylesheets');
var options = {
   includePaths: [bootstrapPath, bootstrapPath+'/bootstrap']
};
console.log(bootstrapPath);
gulp.task('sass', function (cb) {
   return gulp.src([path.resolve(appdir, 'styles/index.sass')])
      .pipe(sass(options))
      .pipe(gulp.dest(outdir), cb);
});
