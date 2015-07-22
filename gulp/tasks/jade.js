var config = require('../config');
var jade = require('gulp-jade');
var dataGulp = require('gulp-data');
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

var jadeFiles = [
   path.resolve(config['pub-directory'], 'jade/index.jade'),
   path.resolve(config['pub-directory'], 'jade/404.jade')
];

var jadeOptions = {
   pretty: false
};

function getLocals(file, cb) {
   var result = {
      title: config['app-name'],
      description: config['app-description']
   };
   cb(undefined, result);
}

gulp.task('jade', ['sass', 'browserify'], function (cb) {
   return gulp.src(jadeFiles)
      .pipe(dataGulp(getLocals))
      .pipe(jade(jadeOptions))
      .pipe(gulp.dest(config['out-directory']));
});
