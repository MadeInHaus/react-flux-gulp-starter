var dest = "./build";
var src = './src';
var port = parseInt(process.env.PORT, 10) || 3000;

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
    staticAssets: {
        // Put an array of folder globs, such as src + '/**/fonts/**/*', 
        // src + '/**/html/**/*'
        src: [
            // src + '/**/fonts/**/*',
            // src + '/**/html/**/*',
        ], 
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
    heroku: {
        development: {
            branch: 'dev',
            remoteName: 'dev',
            remoteUrl: 'https://git.heroku.com/HEROKU_APP_NAME_DEV.git',
            website: 'http://HEROKU_APP_NAME_DEV.herokuapp.com'
        },
        staging: {
            branch: 'staging',
            remoteName: 'staging',
            remoteUrl: 'https://git.heroku.com/HEROKU_APP_NAME_STAGING.git',
            website: 'http://HEROKU_APP_NAME_STAGING.herokuapp.com'
        },
        production: {
            branch: 'master',
            remoteName: 'prod',
            remoteUrl: 'https://git.heroku.com/HEROKU_APP_NAME_PRODUCTION.git',
            website: 'http://HEROKU_APP_NAME_PRODUCTION.herokuapp.com'
        }
    },
    settings: {
        src: './settings.json',
        dest: dest
    }
};
