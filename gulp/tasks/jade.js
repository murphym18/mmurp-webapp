var config = require('../config');
var jade = require('jade');
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

gulp.task('jade', ['sass', 'browserify'], function (cb) {
   var indexTemplate = path.resolve(config['pub-directory'], 'jade/index.jade');
   var jadeOptions = {
      pretty: false,

   };
   var templateLocals = {
      title: config['app-name'],
      description: config['app-description']
   };
   var fn = jade.compileFile(indexTemplate, jadeOptions);
   var html = fn(templateLocals);
   var outFile = 'index.html';
   return bufferStringStream(outFile, html)
      .pipe(gulp.dest(config['tmp-directory']));
});

function bufferStringStream(filename, string) {
   var stream = source(filename);
   stream.write(string);

   process.nextTick(function() {
      stream.end();
   });

   return stream
      .pipe(vinylBuffer())
}
