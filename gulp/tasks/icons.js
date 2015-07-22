var config = require('../config');
// var outdir = config['tmp-directory'];
// var watchify = require('watchify');
// var browserify = require('browserify');
var gulp = require('gulp');
var path = require('path');


gulp.task('icons', function(cb) {
   var colors = ["blue",  "darkblue",  "gray",  "green",  "orange"];
   var i = Math.floor(Math.random()*colors.length);
   var color = colors[i];

   var files = path.resolve(config['pub-directory'], 'icons', color) + '/*';
   return gulp.src(files)
      .pipe(gulp.dest(config['out-directory']));
});
