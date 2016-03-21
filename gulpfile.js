'use strict';

//TODO: helper for svgSprite
var gulp = require('gulp');

function lazyTask(taskName, path, options) {
    options = options || {};
    options.taskname = taskName;
    gulp.task(taskName, function(callback) {
        var task = require(path).call(this, options);

        return task(callback);
    })
};

var paths = {
    base: 'frontend/web/'
};

gulp.task('watch', function(){
    gulp.watch(
        paths.base + 'dev/sass/**/*.{sass,css}',
        ['sass:frontend']
    );
    gulp.watch(
        paths.base + 'dev/sass/content-design.sass',
        ['sass:backend']
    );
    // gulp.watch(
    //     paths.base + 'dev/fonts/*.{eot,svg,ttf,woff,woff2}',
    //     ['copy:fonts']
    // );
    gulp.watch(
        paths.base + 'dev/icons/*.svg',
        ['svg:sprite']
    );
});

gulp.task('default', [
    'watch',
    'sass:frontend',
    'sass:backend',
    'copy:fonts',
    'svg:sprite'
]);

lazyTask('sass:frontend', './gulp-modules/sass', {
    src: 'frontend/web/dev/sass/main.sass',
    dst: 'frontend/web/dist/css',
    newName: undefined,
    minify: false,
    maps: true
});

lazyTask('sass:backend', './gulp-modules/sass', {
    src: 'frontend/web/dev/sass/content-design.sass',
    dst: 'backend/web/dist/css',
    newName: undefined,
    minify: true,
    maps: false
});

lazyTask('clean', './gulp-modules/clean', [
    'frontend/web/dist/css',
    'frontend/web/dist/fonts',
    'backend/web/dist/css',
    'frontend/web/dist/sprite',
    'frontend/web/temp'
]);

lazyTask('svg:sprite', './gulp-modules/svg-sprite', {
    src: 'frontend/web/dev/icons/*.svg',
    dst: 'frontend/web/dist/sprite',
    examplePath: 'frontend/web/temp'
});

lazyTask('copy:fonts', './gulp-modules/copy', {
    src: 'frontend/web/dev/fonts/*.{eot,svg,ttf,woff,woff2}',
    dst: 'frontend/web/dist/fonts'
});