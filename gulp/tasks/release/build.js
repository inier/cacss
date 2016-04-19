/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build:release', function (callback) {
    runSequence(
        //'clean',
        [
            'html',
            'scss:min',
            'js',
            'images'
        ],
        'base64',
        [
            'optimize:css',
            'optimize:js',
            'optimize:images',
            'optimize:html',
            'copy:fonts:release'
        ],
        'revision',
        'rev:collect',
        [
            'webp',
            'gzip'
        ],
        callback);
});