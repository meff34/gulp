'use strict';

/* TODO: helper for svgSprite */
/* TODO: issue: таски перестали заканчиваться! */

var gulp = require('gulp');
var del = require('del');
var path = require('path');

var helper = require('./gulp-modules/helper.js');

var paths = {
    frontBase: 'frontend/web/',
    backBase: 'backend/web/'
};

gulp.task('watch', function(){
    gulp.watch(
        paths.frontBase + 'dev/sass/**/*.{sass,css}',
        ['sass:frontend']
    );
    gulp.watch(
        paths.frontBase + 'dev/sass/content-design.sass',
        ['sass:backend']
    );
    gulp.watch(
        paths.frontBase + 'dev/icons/*.svg',
        ['svg:sprite']
    );
    gulp.watch(
        paths.frontBase + 'dev/icons/*.svg',
        ['svg:sprite']
    );
    
    
    gulp.watch(
        paths.backBase + 'dev/images/**/*.*',
        ['imagemin:backend']
    );
    gulp.watch(
        [
            paths.frontBase + 'dev/images/**/*.*',
            paths.frontBase + 'dev/temp-images/**/*.*'
        ],
        ['imagemin:frontend']
    );
    helper.deleteListener(
        paths.frontBase + 'dev/images/**/*.*',
        paths.frontBase + 'dist/images/**/*.*'
    );
    helper.deleteListener(
        paths.frontBase + 'dev/temp-images/**/*.*',
        paths.frontBase + 'dist/images/**/*.*'
    );
    helper.deleteListener(
        'backend/web/dev/images/**/*.*',
        'backend/web/images'
    );
});

gulp.task('default', [
    'watch',
    'sass:frontend',
    'sass:backend',
    'svg:sprite'
]);

helper.lazyTask('sass:frontend', './sass', {
    src: 'frontend/web/dev/sass/main.sass',
    dst: 'frontend/web/dist/css',
    newName: undefined,
    minify: false
});

helper.lazyTask('sass:backend', './sass', {
    src: 'frontend/web/dev/sass/content-design.sass',
    dst: 'backend/web/dist/css',
    newName: undefined,
    minify: false
});

helper.lazyTask('clean', './clean', [
    'frontend/web/dist/css',
    'frontend/web/dist/fonts',
    'backend/web/dist/css',
    'frontend/web/dist/sprite',
    'frontend/web/temp',
    'frontend/web/dist/images'
]);

helper.lazyTask('svg:sprite', './svg-sprite', {
    src: 'frontend/web/dev/icons/*.svg',
    dst: 'frontend/web/dist/sprite',
    examplePath: 'frontend/web/temp'
});

helper.lazyTask('imagemin:frontend', './imagemin', {
    src: [
        'frontend/web/dev/temp-images/**/*.*',
        'frontend/web/dev/images/**/*.*'
    ],
    dst: 'frontend/web/dist/images'
});

/*TODO: не забудь поменять dst в новом проекте!!!*/
helper.lazyTask('imagemin:backend', './imagemin', {
    src: 'backend/web/dev/images/**/*.*',
    dst: 'backend/web/images'
});

helper.deleteListener();