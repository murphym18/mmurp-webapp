'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var uglify = require('gulp-uglify');

// add custom browserify options here
var customOpts = {
   "entries": [
      "./app/index.js"
   ],
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
   ]
};
var opts = assign({}, watchify.args, customOpts);
var b = browserify(opts);

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('build', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
   return b.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      // optional, remove if you don't need to buffer file contents
      .pipe(buffer())
      .pipe(uglify({
         mangle: false,
         output: {
            indent_start: 0, // start indentation on every line (only when `beautify`)
            indent_level: 3, // indentation level (only when `beautify`)
            quote_keys: false, // quote all keys in object literals?
            space_colon: true, // add a space after colon signs?
            ascii_only: false, // output ASCII-safe? (encodes Unicode characters as ASCII)
            inline_script: false, // escape "</script"?
            width: 80, // informative maximum line width (for beautified output)
            max_line_len: 32000, // maximum line length (for non-beautified output)
            beautify: true, // beautify output?
            source_map: null, // output a source map
            bracketize: false, // use brackets every time?
            comments: true, // output comments?
            semicolons: true, // use semicolons to separate statements? (otherwise, new
         }
      }))
      // optional, remove if you dont want sourcemaps
      .pipe(sourcemaps.init({
         loadMaps: true
      })) // loads map from browserify file
      // Add transformation tasks to the pipeline here.

   .pipe(sourcemaps.write('./')) // writes .map file
      .pipe(gulp.dest('./dist'));
}
