/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

const _isEmpty = require('lodash/isEmpty');
const gulp = require('gulp-help')(require('gulp'));
const watch = require('gulp-watch');
const config = require('../config');

const sassTask = require('./sass');
const imagesTask = require('./images');
const staticAssets = require('./staticAssets');

gulp.task(
    'watch',
    'Listen for file changes and recompile',
    ['watchify'],
    function(callback) {
        watch(
            config.sass.src,
            {
                name: 'watch-sass',
                read: false,
            },
            sassTask
        );

        watch(
            config.images.src,
            {
                name: 'watch-images',
                read: false,
            },
            imagesTask
        );

        if (!_isEmpty(config.staticAssets.src)) {
            watch(
                config.staticAssets.src,
                {
                    name: 'watch-static-assets',
                    read: false,
                },
                staticAssets
            );
        }

        callback();
    }
);
