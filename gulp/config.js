const dest = './build';
const src = './src';
const port = parseInt(process.env.PORT, 10) || 3000;
const path = require('path');

module.exports = {
    nodemon: {
        script: './server.js',
        ext: 'js',
        ignore: ['build/*', 'node_modules/*'],
        env: {
            'NODE_ENV': 'development',
            'DEBUG': 'Server',
            'PORT': port,
        },
    },
    sass: {
        src: src + '/sass/**/*.{sass,scss}',
        dest: dest + '/css',
        settings: {
            // Required if you want to use SASS syntax
            // See https://github.com/dlmanning/gulp-sass/issues/81
            sourceComments: 'map',
            imagePath: '/images', // Used by the image-url helper
        },
    },
    images: {
        src: src + '/images/**',
        dest: dest + '/images',
    },
    markup: {
        src: src + '/html/**/*.html',
        dest,
    },
    staticAssets: {
        // Put an array of folder globs, such as src + '/**/fonts/**/*',
        // src + '/**/html/**/*'
        src: [
            // src + '/**/fonts/**/*',
            // src + '/**/html/**/*',
        ],
        dest,
    },
    production: {
        cssSrc: dest + '/css/*.css',
        jsSrc: dest + '/js/*.js',
        dest,
    },
    heroku: {
        development: {
            branch: 'dev',
            remoteName: 'dev',
            remoteUrl: 'https://git.heroku.com/HEROKU_APP_NAME_DEV.git',
            website: 'http://HEROKU_APP_NAME_DEV.herokuapp.com',
        },
        staging: {
            branch: 'staging',
            remoteName: 'staging',
            remoteUrl: 'https://git.heroku.com/HEROKU_APP_NAME_STAGING.git',
            website: 'http://HEROKU_APP_NAME_STAGING.herokuapp.com',
        },
        production: {
            branch: 'master',
            remoteName: 'prod',
            remoteUrl: 'https://git.heroku.com/HEROKU_APP_NAME_PRODUCTION.git',
            website: 'http://HEROKU_APP_NAME_PRODUCTION.herokuapp.com',
        },
    },
    settings: {
        src: './settings.json',
        dest,
    },
    webpackDevServer:  {
        contentBase: path.resolve('../build/'),
        publicPath: '/js/',
        fileName: 'client.js',
        quiet: false,
        noInfo: true,
        stats: {
            colors: true
        }
    },
    modernizr: {
        'fileName': 'modernizr-custom.js',
        'dest': dest + '/js',
        'options': {

            // Based on default settings on http://modernizr.com/download/
            'options': [
                'setClasses',
                'addTest',
                'html5printshiv',
                'testProp',
                'fnBind',
            ],

            // Define any tests you want to explicitly include
            'tests': [
                'autoplay',
                'csspointerevents',
                'devicemotion',
                'deviceorientation',
                'preserve3d',
                'touchevents',
                'video',
                'videoautoplay',
                'webgl',
            ],

            // By default, will crawl your project for references to Modernizr tests
            // Set to false to disable
            'crawl': false,

            // Set to true to pass in buffers via the 'files' parameter below
            'useBuffers': false,

            // Have custom Modernizr tests? Add them here.
            'customTests': [],
        },
    },
};
