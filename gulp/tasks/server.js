let changed = require('gulp-changed'),
    gulp = require('gulp-help')(require('gulp')),
    config = require('../config').nodemon,
    nodemon = require('gulp-nodemon');

gulp.task(
    'server',
    'Starts local development server and watches',
    ['watch'],
    function(cb) {
        let started = false;
        return nodemon(config).on('start', function() {
            if (!started) {
                started = true;
                setTimeout(function() {
                    cb();
                }, 1000);
            }
        });
    }
);
