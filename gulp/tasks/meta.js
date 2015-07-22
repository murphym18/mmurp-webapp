var config = require('../config');
var jade = require('jade');
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');
var metaDir = path.resolve(config['pub-directory'], 'meta');



gulp.task('meta', ['meta-favicons', 'meta-humans', 'meta-robots',
   'meta-crossdomain'
]);

gulp.task('meta-robots', function(cb) {
   return gulp.src(path.resolve(metaDir, 'robots.txt'))
      .pipe(gulp.dest(config['out-directory']));
});

gulp.task('meta-crossdomain', function(cb) {
   return gulp.src(path.resolve(metaDir, 'crossdomain.xml'))
      .pipe(gulp.dest(config['out-directory']));
});

gulp.task('meta-favicons', function(cb) {
   var colors = ["blue", "darkblue", "gray", "green", "orange"];
   var i = Math.floor(Math.random() * colors.length);
   var color = colors[i];

   var files = path.resolve(config['pub-directory'], 'icons', color) +
      '/*';
   return gulp.src(files)
      .pipe(gulp.dest(config['out-directory']));
});


gulp.task('meta-humans', humans);

var monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
];

function humans() {
   var now = new Date();

   var locals = {
      year: now.getFullYear(),
      month: monthNames[now.getMonth()],
      day: now.getDate()
   }

   return gulp.src(path.resolve(metaDir, 'humans.hbs'))
      .pipe(handlebars(locals))
      .pipe(rename('humans.txt'))
      .pipe(gulp.dest(config['out-directory']));
}
