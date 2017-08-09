const gulp = require('gulp-help')(require('gulp'));
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const handleErrors = require('../util/handleErrors');
const config = require('../config').sass;
const autoprefixer = require('gulp-autoprefixer');

const taskDef = function() {
    return gulp
        .src(config.src)
        .pipe(sourcemaps.init())
        .pipe(sass(config.settings))
        .on('error', handleErrors)
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions'],
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
};

module.exports = taskDef;

gulp.task('sass', false, taskDef);
