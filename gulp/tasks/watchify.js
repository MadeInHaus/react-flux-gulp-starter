const gulp = require('gulp-help')(require('gulp'));
const browserifyTask = require('./browserify');

gulp.task('watchify', false, function(callback) {
    // Start browserify task with devMode === true
    browserifyTask(callback, true);
});
