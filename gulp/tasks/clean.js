var config = require('../config');
var gulp = require('gulp');
var del = require('del');
var outdir = config['out-directory'];
var tmpdir = config['tmp-directory'];
gulp.task('clean', function(cb) {
   del([outdir, tmpdir], cb);
});
