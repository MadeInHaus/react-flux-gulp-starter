/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');
var watchify = require('./browserify');

var sassTask = require('./sass');
var imagesTask = require('./images');
var markupTask = require('./markup');

gulp.task('watch', ['watchify', 'browserSync'], function (callback) {
    watch(config.sass.src, {
        name: 'watch-sass',
        read: false
    }, sassTask);

    watch(config.images.src, {
        name: 'watch-images',
        read: false
    }, imagesTask);

    watch(config.markup.src, {
        name: 'watch-markup',
        read: false
    }, markupTask);

    // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
