const gulp = require('gulp-help')(require('gulp'));
const config = require('../config').production;
const size = require('gulp-filesize');
const uglify = require('gulp-uglify');

gulp.task('uglifyJs', false, ['browserify'], function() {
    return gulp
        .src(config.jsSrc)
        .pipe(uglify())
        .pipe(gulp.dest(config.dest + '/js'))
        .pipe(size());
});
