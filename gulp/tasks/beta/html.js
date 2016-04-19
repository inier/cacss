/**
 * Created by mosa on 2016/3/16.
 */
// HTML处理
var gulp = require('gulp'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed');
var config = require('../../config').html;

gulp.task('html', function () {
    return gulp.src(config.src)
        .pipe(changed(config.dest))
        .pipe(cache(gulp.dest(config.dest)));
});