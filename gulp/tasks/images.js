var changed = require('gulp-changed');
var gulp = require('gulp-help')(require('gulp'));
var imagemin = require('gulp-imagemin');
var config = require('../config').images;
var browserSync = require('browser-sync');

var taskDef = function() {
    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(imagemin()) // Optimize
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
};

module.exports = taskDef;

gulp.task('images', false, taskDef);
