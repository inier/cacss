/**
 * Created by mosa on 2016/3/17.
 */
// 样式处理
var gulp = require('gulp');                         //基础库
var scss = require('gulp-scss'),                    //scss
    notify = require('gulp-notify'),                //任务过程提示
    handleErrors = require('../../utils/handleErrors'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'), //重命名
    minifycss = require('gulp-minify-css'),         //css压缩
    concat = require('gulp-concat'),                //合并文件
    autoPreFixer = require('gulp-autoprefixer'),
    changed = require('gulp-changed');
var config = require('../../config').styles;

//task: copy:css
gulp.task('css:copy', function () {
    return gulp.src(config.csssrc)   //scss源文件
        .pipe(changed(config.dest))
        .pipe(gulp.dest(config.dest));  //输出目录
});

//task: scss
gulp.task('scss:run', function () {
    return gulp.src(config.src)        //scss源文件
        .pipe(changed(config.dest))
        .pipe(plumber({errorHandler: handleErrors}))  //错误提示
        .pipe(autoPreFixer(config.autoprefixer))
        .pipe(scss(config.mode.expanded))   //执行编译
        .pipe(gulp.dest(config.dest));  //输出目录
});

//task: scss
gulp.task('scss:min', ['scss:run'], function () {
    return gulp.src(config.src)        //scss源文件
        .pipe(changed(config.dest))
        .pipe(scss(config.mode.expanded))   //执行编译
        .pipe(gulp.dest(config.dest))  //输出目录
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(config.dest));
});

//task: ca-css
gulp.task('ca-css', function () {
    return gulp.src(config.caCss.src)
        .pipe(changed(config.caCss.dest))
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(autoPreFixer(config.autoprefixer))
        .pipe(scss(config.mode.expanded))
        .pipe(gulp.dest(config.caCss.dest));
});

//task: demo-css
gulp.task('demo-css', function () {
    return gulp.src(config.demoCss.src)
        .pipe(changed(config.demoCss.dest))
        .pipe(plumber({errorHandler: handleErrors}))
        .pipe(autoPreFixer(config.autoprefixer))
        .pipe(scss(config.mode.expanded))
        .pipe(gulp.dest(config.demoCss.dest));
});