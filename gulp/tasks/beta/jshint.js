/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var config = require('../../config').scripts.jshint;

/**
 * Check JavaScript sytax with JSHint
 */
gulp.task('jshint', function () {
    return gulp.src(config.src)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});