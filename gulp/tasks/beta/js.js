/**
 * Created by mosa on 2016/3/11.
 */
// js处理
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),    //js检查
    changed = require('gulp-changed'),
    cache = require('gulp-cache');
var config = require('../../config').scripts;

gulp.task('js', function () {
    return gulp.src(config.src)
        .pipe(changed(config.dest))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        //.pipe(concat('main.js'))
        .pipe(cache(gulp.dest(config.dest)));
});