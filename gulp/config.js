var dest = "./build";
var src = './src';
var port = 3000;

module.exports = {
    nodemon: {
        script: './server.js',
        ext: 'js',
        ignore: ['build/*', 'node_modules/*'],
        env: {
            'NODE_ENV': 'development',
            'DEBUG': 'Server',
            'PORT': port
        }
    },
    browserSync: {
        // Don't use browsersync's static browser.
        // We just proxy into the actual server.js here.
        proxy: 'localhost:' + port,
        port: port + 1,
        notify: false,
        open: false
    },
    sass: {
        src: src + "/sass/**/*.{sass,scss}",
        dest: dest + "/css",
        settings: {
            // Required if you want to use SASS syntax
            // See https://github.com/dlmanning/gulp-sass/issues/81
            sourceComments: 'map',
            imagePath: '/images' // Used by the image-url helper
        }
    },
    images: {
        src: src + "/images/**",
        dest: dest + "/images"
    },
    markup: {
        src: src + "/html/**/*.html",
        dest: dest
    },
    browserify: {
        // A separate bundle will be generated for each
        // bundle config in the list below
        bundleConfigs: [{
            entries: src + '/javascript/client.js',
            dest: dest + '/js',
            outputName: 'client.js',
            extensions: ['.js', '.jsx']
        }]
    },
    production: {
        cssSrc: dest + '/css/*.css',
        jsSrc: dest + '/js/*.js',
        dest: dest
    },
    settings: {
        src: './settings.json',
        dest: dest
    }
};
