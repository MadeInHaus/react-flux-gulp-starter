var changed = require('gulp-changed'),
    gulp = require('gulp'),
    config = require('../config').nodemon,
    nodemon = require('gulp-nodemon');

gulp.task('server', ['watch'], function (cb) {
    var started = false;
    return nodemon(config)
        .on('start', function () {
            if (!started) {
                started = true;
                setTimeout(function () { cb(); }, 1000);
            }
        });
});
