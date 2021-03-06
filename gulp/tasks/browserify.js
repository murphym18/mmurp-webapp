var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('./uglify');
var config = require('../config');
var outdir = config['tmp-directory'];
var babelify = require('babelify');

var opts = {
   debug: true,
   "transform": [
      [
         "jadeify", {
            "compileDebug": true,
            "pretty": true
         }
      ],
      [
         "babelify", {
            "stage": 0
         }
      ]
   ],
   cache: {},
   packageCache: {}
};
var b = browserify("./app/index.js", opts); //.exclude('foo');

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

gulp.task('browserify', bundle);
function bundle() {
   return b.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      // optional, remove if you don't need to buffer file contents
      .pipe(buffer())

      // optional, remove if you dont want sourcemaps
      .pipe(sourcemaps.init({
         loadMaps: true
      })) // loads map from browserify file
      .pipe(uglify())
      // Add transformation tasks to the pipeline here.

   .pipe(sourcemaps.write()) // writes .map file
      .pipe(gulp.dest(outdir));
}
