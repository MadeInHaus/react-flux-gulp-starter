var gulp = require('gulp-help')(require('gulp'));
var config = require('../config').production;
var cssNano = require('gulp-cssnano');
var size = require('gulp-filesize');

gulp.task('minifyCss', false, ['sass'], function() {
    return gulp.src(config.cssSrc)
        .pipe(cssNano())
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(size());
})
