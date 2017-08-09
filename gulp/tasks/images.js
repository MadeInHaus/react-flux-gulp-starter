const changed = require('gulp-changed');
const gulp = require('gulp-help')(require('gulp'));
const imagemin = require('gulp-imagemin');
const config = require('../config').images;
const browserSync = require('browser-sync');

const taskDef = function() {
    return gulp
        .src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(imagemin()) // Optimize
        .pipe(gulp.dest(config.dest))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
};

module.exports = taskDef;

gulp.task('images', false, taskDef);
