/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),          //jsѹ��
    rename = require('gulp-rename'),           //������
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
    size = require('gulp-size');
var config = require('../../config').optimize.js;

/**
 * Copy and minimize JS files
 */
gulp.task('optimize:js', function () {
    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        //.pipe(concat('main.js'))
        .pipe(gulp.dest(config.dest))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify(config.options).on('error', function(e){
            console.log(e);
         }))
        .pipe(size())
        .pipe(gulp.dest(config.dest));
});