var config = require('../config');
var jade = require('jade');
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var Hbs = require('handlebars');
var monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
];
var metaDir = path.resolve(config['pub-directory'], 'meta');

function renderHbsFile(inFile, outFile, locals) {
   var data = fs.readFileSync(inFile);

   var func = Hbs.compile(data.toString());
   var outData = func((locals || {}));
   fs.writeFileSync(config['out-directory'] + '/' + outFile, outData);
}

function humans() {
   var now = new Date();
   var locals = {
      year: now.getFullYear(),
      month: monthNames[now.getMonth()],
      day: now.getDate()
   }
   var outFile = 'humans.txt';
   var inFile = path.resolve(metaDir, 'humans.hbs');
   renderHbsFile(inFile, outFile, locals);
}

function copy(cb) {
   return gulp.src([metaDir + '/crossdomain.xml',metaDir + '/robots.txt'])
      .pipe(gulp.dest(config['out-directory']), cb);
}

gulp.task('meta', ['jade'], function(cb) {
   humans();
   return copy();
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
