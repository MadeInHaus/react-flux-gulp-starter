/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.

   See browserify.bundleConfigs in gulp/config.js
*/

var browserify = require('browserify');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp = require('gulp-help')(require('gulp'));
var handleErrors = require('../util/handleErrors');
var source = require('vinyl-source-stream');
var config = require('../config').browserify;
var _ = require('lodash');

var babelify = require('babelify');

var browserifyTask = function(callback, devMode) {

    var bundleQueue = config.bundleConfigs.length;

    var browserifyThis = function(bundleConfig) {

        if (devMode) {
            // Add watchify args and debug (sourcemaps) option
            _.extend(bundleConfig, watchify.args, {
                debug: true
            });
            // A watchify require/external bug that prevents proper recompiling,
            // so (for now) we'll ignore these options during development
            bundleConfig = _.omit(bundleConfig, ['external', 'require']);
        }

        var b = browserify(bundleConfig);

        b.transform(babelify, { presets: ['es2015', 'react', 'stage-2'] });

        var bundle = function() {
            // Log when bundling starts
            bundleLogger.start(bundleConfig.outputName);

            return b
                .bundle()
                // Report compile errors
                .on('error', handleErrors)
                // Use vinyl-source-stream to make the
                // stream gulp compatible. Specify the
                // desired output filename here.
                .pipe(source(bundleConfig.outputName))
                // Specify the output destination
                .pipe(gulp.dest(bundleConfig.dest))
                .on('end', reportFinished)
                .pipe(browserSync.reload({
                    stream: true
                }));
        };

        if (devMode) {
            // Wrap with watchify and rebundle on changes
            b = watchify(b);
            // Rebundle on update
            b.on('update', bundle);
            bundleLogger.watch(bundleConfig.outputName);
        } else {
            // Sort out shared dependencies.
            // b.require exposes modules externally
            if (bundleConfig.require) {
                b.require(bundleConfig.require);
            }
            // b.external excludes modules from the bundle, and expects
            // they'll be available externally
            if (bundleConfig.external) {
                b.external(bundleConfig.external);
            }
        }

        var reportFinished = function() {
            // Log when bundling completes
            bundleLogger.end(bundleConfig.outputName);

            if (bundleQueue) {
                bundleQueue--;
                if (bundleQueue === 0) {
                    // If queue is empty, tell gulp the task is complete.
                    // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
                    callback();
                }
            }
        };

        return bundle();
    };

    // Start bundling with Browserify for each bundleConfig specified
    config.bundleConfigs.forEach(browserifyThis);
};

gulp.task('browserify', false, browserifyTask);

// Exporting the task so we can call it directly in our watch task, with the 'devMode' option
module.exports = browserifyTask;
