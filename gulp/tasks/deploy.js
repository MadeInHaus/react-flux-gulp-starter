var gulp = require('gulp-help')(require('gulp'));

// Run this to deploy to s3!
gulp.task('deploy', 'Deploy static assets to S3', ['s3']);
