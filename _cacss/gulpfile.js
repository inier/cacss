// 导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    scss = require('gulp-scss'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify');
var utf8Convert = require('gulp-utf8-convert');
// 源文件路径
var sourcePath = 'src/sass';
// 生成文件路径
var filePath = 'css/styles';
// 样式
gulp.task('styles', function () {
    return gulp.src(sourcePath + '/caec-mobile.scss')
        .pipe(scss({style: 'expanded'}))
        .pipe(gulp.dest(filePath))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(filePath))
        .pipe(notify({message: 'Styles task complete'}));
});
// 清理
gulp.task('clean', function () {
    return gulp.src([filePath], {read: false})
        .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function () {
    gulp.start('styles');
});

// 看守
gulp.task('watch', function () {
    // 看守所有.scss档
    gulp.watch(sourcePath + '/**/*.scss', ['styles']);

// 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
//    gulp.watch([filePath + '/**']).on('change', function (file) {
//        server.changed(file.path);
//   });
});