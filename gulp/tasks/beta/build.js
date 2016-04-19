/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build:beta', function (callback) {
    runSequence(
        //'clean',
        [
            'html',
            'scss:run',
            'ca-css',
            'demo-css',
            'js',
            'sprites',
            'images:min'
        ],
        'base64',
        ['copy:fonts'],
        callback
    );
});