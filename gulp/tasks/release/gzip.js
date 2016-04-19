/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var gzip = require('gulp-gzip');
var config = require('../../config').gzip;

/**
 * Gzip text files
 */
gulp.task('gzip', ['build:release'], function () {
    return gulp.src(config.src)
        .pipe(gzip(config.options))
        .pipe(gulp.dest(config.dest));
});