var gulp = require('gulp-help')(require('gulp'));
var browserifyTask = require('./browserify');

gulp.task('watchify', false, function(callback) {
    // Start browserify task with devMode === true
    browserifyTask(callback, true);
});
