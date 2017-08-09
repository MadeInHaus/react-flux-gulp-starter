const gulp = require('gulp-help')(require('gulp'));
const config = require('../config').markup;
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-filesize');

gulp.task('minifyHtml', false, function() {
    return gulp
        .src(config.src)
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true,
                removeStyleLinkTypeAttributes: true,
            })
        )
        .pipe(gulp.dest(config.dest))
        .pipe(size());
});
