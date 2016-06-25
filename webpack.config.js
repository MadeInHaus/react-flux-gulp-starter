const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./src/javascript/client.js'],

        // leverage browser caching by saving react and react-dom to separate file
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.resolve('./build/js'),
        publicPath: '/js/',
        filename: 'client.js',
    },
    module: {
        loaders: [{
            test: /(\.js|\.jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        })
    ]
};
