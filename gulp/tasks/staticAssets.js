var gulp = require('gulp');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');
var config = require('../config').staticAssets;

var taskDef = function () {

    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
};

module.exports = taskDef;

gulp.task('staticAssets', taskDef);
