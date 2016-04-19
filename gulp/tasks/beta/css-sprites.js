/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
var cache = require('gulp-cache');
var config = require('../../config').images.sprites;

/**
 * Generate sprite and css file from PNGs
 */
gulp.task('sprites', function () {
    // Generate our spritesheet
    var spriteData = gulp.src(config.src)
        .pipe(spritesmith(config.options));

    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(config.dest.image));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        .pipe(csso())
        .pipe(gulp.dest(config.dest.css));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
});