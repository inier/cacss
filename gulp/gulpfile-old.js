// 导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    scss = require('gulp-scss'),
    minifycss = require('gulp-minify-css'),
    scssLint = require('gulp-scss-lint'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    cache = require('gulp-cached'),
    gzip = require('gulp-gzip'),
    livereload = require('gulp-livereload'),
    handleErrors = require('handleErrors');

// 源文件路径
var sourcePath = 'tool-precss/cacss/src/sass';
var fileReg = '/**/!(_)*';
var fileName = '/caec-mobile.scss';
// 生成文件路径
var DEST = 'www/shared/css';

// 样式
gulp.task('ca-css', function () {
    return gulp.src(sourcePath + fileName)
        //.pipe(cache('styles'))
        //.pipe(scssLint())
        .pipe(scss({style: 'expanded'}))
        .on('error', handleErrors)   //交给notify处理错误
        .pipe(gulp.dest(DEST))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(minifycss())
        //.pipe(gulp.dest(DEST))
        //.pipe(gzip())
        //.pipe(gulp.dest(DEST))
        .pipe(notify({message: 'CACSS task complete.'}));
});

//demo.scss
var demoSource = 'www/CAEC-demo',
    demoFile = "/demo.scss",
    demoDest = "www/CAEC-demo";
gulp.task('demo-css', function () {
    return gulp.src(demoSource + demoFile)
        .pipe(scss({style: 'expanded'}))
        .pipe(gulp.dest(demoDest))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(minifycss())
        //.pipe(gulp.dest(demoDest))
        //.pipe(gzip())
        //.pipe(gulp.dest(demoDest))
        .pipe(notify({message: 'Demo-css task complete.'}));
});

// 清理
gulp.task('clean', function () {
    return gulp.src([DEST, demoDest], {read: false})
        .pipe(clean());
});

// 预设任务
gulp.task('default', ['clean'], function () {
    gulp.start(['ca-css','demo-css']);
});

// 看守
gulp.task('watch', function () {
    // 看守所有.scss档
    gulp.watch([sourcePath + '/**/*.scss'], ['ca-css']);
    gulp.watch([demoSource + '/*.scss'], ['demo-css']);

    // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
    //gulp.watch([DEST + '/**']).on('change', function (file) {
    //    server.changed(file.path);
    //});
});