var gulp = require('gulp');

gulp.task('production', ['images', 'minifyCss', 'uglifyJs']);
