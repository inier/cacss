/**
 * Created by mosa on 2016/3/16.
 */
// 图片处理
var gulp = require('gulp'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),       //图片压缩
    cache = require('gulp-cache');
//var gulpSharp = require('gulp-sharp');  //需要安装Node.js v0.10+, libvips v8.0+
var config = require('../../config').images;

/**
 * Copy images to build folder
 * if not changed
 */
gulp.task('images', function () {
    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(cache(gulp.dest(config.dest)));
});

gulp.task('images:min', function () {
    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(cache(imagemin(config.options)))
        .pipe(gulp.dest(config.dest));
});

//gulp.task('image-resize', function () {
//    return gulp.src(config.resize.src, {read: false})
//        .pipe(gulpSharp({
//            resize: [900, 450],
//            max: true,
//            quality: 60,
//            progressive: true
//        }))
//        .pipe(gulp.dest(config.resize.dest));
//});