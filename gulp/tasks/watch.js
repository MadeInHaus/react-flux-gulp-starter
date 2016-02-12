/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var _ = require('lodash');
var gulp = require('gulp-help')(require('gulp'));
var watch = require('gulp-watch');
var config = require('../config');

var sassTask = require('./sass');
var imagesTask = require('./images');
var staticAssets = require('./staticAssets');

gulp.task('watch', 'Listen for file changes and recompile', ['watchify'], function(callback) {

    watch(config.sass.src, {
        name: 'watch-sass',
        read: false
    }, sassTask);

    watch(config.images.src, {
        name: 'watch-images',
        read: false
    }, imagesTask);



    if(!_.isEmpty(config.staticAssets.src)) {
        watch(config.staticAssets.src, {
            name: 'watch-static-assets',
            read: false
        }, staticAssets);        
    }

    callback();

});
