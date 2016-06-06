var gulp = require('gulp');
var modernizr = require('gulp-modernizr');
var uglify = require('gulp-uglify');
var config = require('../config').modernizr;

gulp.task('modernizr', function() {
    gulp.src('*.js')
        .pipe(modernizr(config.fileName, config.options))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest));
});
