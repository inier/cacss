/**
 * Created by mosa on 2016/3/17.
 */
// ��ʽ����
var gulp = require('gulp');                         //������
var scss = require('gulp-scss'),                    //scss
    notify = require('gulp-notify'),                //���������ʾ
    handleErrors = require('../../utils/handleErrors'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'), //������
    minifycss = require('gulp-minify-css'),         //cssѹ��
    concat = require('gulp-concat'),                //�ϲ��ļ�
    autoPreFixer = require('gulp-autoprefixer'),
    changed = require('gulp-changed');
var config = require('../../config').styles;

//task: copy:css
gulp.task('css:copy', function () {
    return gulp.src(config.csssrc)   //scssԴ�ļ�
        .pipe(changed(config.dest))
        .pipe(gulp.dest(config.dest));  //���Ŀ¼
});

//task: scss
gulp.task('scss:run', function () {
    return gulp.src(config.src)        //scssԴ�ļ�
        .pipe(changed(config.dest))
        .pipe(plumber({errorHandler: handleErrors}))  //������ʾ
        .pipe(autoPreFixer(config.autoprefixer))
        .pipe(scss(config.mode.expanded))   //ִ�б���
        .pipe(gulp.dest(config.dest));  //���Ŀ¼
});

//task: scss
gulp.task('scss:min', ['scss:run'], function () {
    return gulp.src(config.src)        //scssԴ�ļ�
        .pipe(changed(config.dest))
        .pipe(scss(config.mode.expanded))   //ִ�б���
        .pipe(gulp.dest(config.dest))  //���Ŀ¼
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