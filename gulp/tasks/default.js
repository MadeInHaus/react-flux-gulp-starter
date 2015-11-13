var gulp = require('gulp-help')(require('gulp'));

gulp.task('default', 'Runs build and starts watch task', ['sass', 'images', 'browserSync']);
