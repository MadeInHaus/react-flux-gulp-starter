var gulp = require('gulp-help')(require('gulp'));

gulp.task('default', 'Runs build and starts watch task', [
    'clean',
    'sass',
    'images',
    'modernizr',
    'browserSync',
    'staticAssets',
]);
