/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var size = require('gulp-size'),
    changed = require('gulp-changed');
var config = require('../../config').optimize.css;

/**
 * Copy CSS files
 */
gulp.task('optimize:css', function () {
    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(size())
        .pipe(gulp.dest(config.dest));
});