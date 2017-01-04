var gulp = require('gulp-help')(require('gulp'));
var del = require('del');
var config = require('../config').production;

gulp.task('clean', 'Remove files within the build directory', function() {
    console.log('config destination', config.dest);
    return del([
        config.dest + '**/*',
    ]);
});
