const browserSync = require('browser-sync');
const gulp = require('gulp-help')(require('gulp'));
const config = require('../config').browserSync;

gulp.task('browserSync', false, ['server'], function() {
    browserSync(config);
});
