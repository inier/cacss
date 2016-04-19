/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var webp = require('gulp-webp');
var size = require('gulp-size');
var cache = require('gulp-cache');
var config = require('../../config').images.webp;

/**
 * Convert images to WebP
 */
gulp.task('webp', function () {
    return gulp.src(config.src)
        .pipe(cache(webp(config.options)))
        .pipe(size())
        .pipe(gulp.dest(config.dest));
});