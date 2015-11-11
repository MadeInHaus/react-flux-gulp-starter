var gulp = require('gulp-help')(require('gulp'));
var config = require('../config').production;
var size = require('gulp-filesize');
var uglify = require('gulp-uglify');

gulp.task('uglifyJs', false, ['browserify'], function() {
    return gulp.src(config.jsSrc)
        .pipe(uglify())
        .pipe(gulp.dest(config.dest + '/js'))
        .pipe(size());
});
