/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp'),
    del = require('del'),
    cache = require('gulp-cache');
var config = require('../../config').del;

// 清理多余的编译缓存
gulp.task('clean:dist', function(callback) {
    del(config.src, callback);
});

gulp.task('clean:cache', function(callback) {
    del(config.src);
    return cache.clearAll(callback);
});