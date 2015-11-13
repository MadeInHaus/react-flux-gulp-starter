var browserSync = require('browser-sync');
var gulp = require('gulp-help')(require('gulp'));
var config = require('../config').browserSync;

gulp.task('browserSync', false, ['server'], function() {
    browserSync(config);
});
