const gulp = require('gulp-help')(require('gulp'));
const config = require('../config').production;
const cleanCSS = require('gulp-clean-css');
const size = require('gulp-filesize');

gulp.task('minifyCss', false, ['sass'], function() {
    return gulp
        .src(config.cssSrc)
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(size());
});
