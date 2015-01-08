var dest = "./build";
var src = './src';

module.exports = {
    browserSync: {
        server: {
            // Serve up our build folder
            baseDir: dest
        }
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
            entries: src + '/javascript/main.js',
            dest: dest + '/js',
            outputName: 'main.js',
            // Additional file extentions to make optional
            extensions: ['.coffee', '.js', '.hbs'],
            // list of modules to make require-able externally
            //require: ['some-module', 'another-module']
        }]
    },
    production: {
        cssSrc: dest + '/css/*.css',
        jsSrc: dest + '/js/*.js',
        dest: dest
    }
};
