/**
 * Created by mosa on 2016/3/16.
 */
//browser-sync
var browserSync = require('browser-sync'),
    gulp = require('gulp');
var config = require('../../config').browserSync.beta;
/**
 * Run the build task and start a server with BrowserSync
 */
gulp.task('browserSync', ['build:beta'], function () {
    browserSync(config, function (err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    //监听任何文件变化，实时刷新页面
    gulp.watch(config.files).on('change', browserSync.reload);
});

gulp.task("reload", function () {
    gulp.src(config.files)
        .pipe(browserSync.reload({stream: true}));
});