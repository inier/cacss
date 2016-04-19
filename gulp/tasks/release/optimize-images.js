/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp'),
    changed = require('gulp-changed'),
    size = require('gulp-size');
var config = require('../../config').optimize.images;

/**
 * Copy and minimize image files
 */
gulp.task('optimize:images', function () {
    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(size())
        .pipe(gulp.dest(config.dest));
});