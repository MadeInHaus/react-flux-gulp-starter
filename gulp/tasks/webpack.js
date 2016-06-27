'use strict';

const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const gulpConfig = require('../config.js');

let config = require('../../webpack.config.js');

gulp.task("webpack:build", function(callback) {
    // modify some webpack config options
    let prodConfig = Object.create(config);
    prodConfig.plugins = prodConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(prodConfig, (err, stats) => {
        if (err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

const devConfig = Object.create(config);
devConfig.devtool = '#eval-source-map';
devConfig.debug = true;

const devCompiler = webpack(devConfig);

gulp.task('webpack:build-dev', callback => {
    devCompiler.run((err, stats) => {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('webpack-dev-server', callback => {
    let firstBundle = true;

    devConfig.entry.app.unshift('webpack-dev-server/client?http://0.0.0.0:8080/');

    const compiler = webpack(devConfig);
    let bundleStart;

    compiler.plugin('compile', function() {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    compiler.plugin('done', function() {
        if(firstBundle){
            callback();
            firstBundle = false;
        }
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });
    new WebpackDevServer(compiler, gulpConfig.webpackDevServer).listen(8080);
});
