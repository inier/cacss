/**
 * Created by mosa on 2016/3/16.
 */
// FONT处理
var gulp = require('gulp'),
    cache = require('gulp-cache');
var config1 = require('../../config').fonts.beta;
var config2 = require('../../config').fonts.release;
gulp.task('copy:fonts', function () {
    return gulp.src(config1.src)
        .pipe(gulp.dest(config1.dest));
});

/**
 * Copy fonts to folder
 */
gulp.task('copy:fonts:release', ['copy:fonts'], function () {
    return gulp.src(config2.src)
        .pipe(gulp.dest(config2.dest));
});