'use strict';
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

const config = require('../webpack.config.js');
config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/');
const compiler = webpack(config);
let bundleStart;

compiler.plugin('compile', function() {
  console.log('Bundling...');
  bundleStart = Date.now();
});

// We also give notice when it is done compiling, including the
// time it took. Nice to have
compiler.plugin('done', function() {
  console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
});
const server = new WebpackDevServer(compiler, {
    contentBase: path.resolve('../build/'),
    publicPath: '/js/',
    fileName: 'client.js',
    quiet: false,
    noInfo: true,
   stats: {
     colors: true
   }
});
server.listen(8080);
