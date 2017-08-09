const gulp = require('gulp-help')(require('gulp'));
const del = require('del');
const config = require('../config').production;

gulp.task('clean', 'Remove files within the build directory', function() {
    console.log('config destination', config.dest);
    return del([config.dest + '**/*']);
});
