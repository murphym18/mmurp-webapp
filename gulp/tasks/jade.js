var config = require('../config');
var jade = require('jade');
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var jadeOptions = {
   pretty: false,
};

function renderJadeFile(inFile, outFile, locals, cb) {
   var fn = jade.compileFile(inFile, jadeOptions);
   var html = fn((locals || {}));

   return bufferStringStream(outFile, html)
      .pipe(gulp.dest(config['tmp-directory']));;
}

gulp.task('jade', ['sass', 'browserify'], function (cb) {
   var inFile = path.resolve(config['pub-directory'], 'jade/404.jade');
   var fn = jade.compileFile(inFile, jadeOptions);
   var html = fn({});
   var data = fs.writeFileSync(config['out-directory'] + '/404.html', html);

   var template = path.resolve(config['pub-directory'], 'jade/index.jade');
   var locals = {
      title: config['app-name'],
      description: config['app-description']
   };
   return renderJadeFile(template, 'index.html', locals);
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
