const gulp = require('gulp');
const modernizr = require('gulp-modernizr');
const uglify = require('gulp-uglify');
const config = require('../config').modernizr;

gulp.task('modernizr', function() {
    gulp
        .src('*.js')
        .pipe(modernizr(config.fileName, config.options))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest));
});
