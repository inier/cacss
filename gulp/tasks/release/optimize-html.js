/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp'),
    changed = require('gulp-changed');
var htmlmin = require('gulp-htmlmin');
var config = require('../../config').optimize.html;

/**
 * Minimize HTML
 */
gulp.task('optimize:html', function () {
    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(htmlmin(config.options))
        .pipe(gulp.dest(config.dest));
});