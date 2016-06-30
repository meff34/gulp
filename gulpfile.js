'use strict';

var gulp = require('gulp');
var del = require('del');
var path = require('path');

var helper = require('./gulp-modules/_helper'),
    config = require('./gulp-modules/_config');

var WTCH = config.watchPaths,
    TSK = config.tasksPaths,
    NMZ = config.taskNames;

gulp.task('build:deep', [
    NMZ.clean,
    NMZ.sassFrontend,
    NMZ.sassBackend,
    NMZ.sassCd,
    NMZ.svgSprite,
    NMZ.imageminFrontend,
    NMZ.imageminBackend,
    NMZ.assets,
    NMZ.babelFrontend,
]);

gulp.task('build', [
    NMZ.sassFrontend,
    NMZ.sassBackend,
    NMZ.sassCd,
    NMZ.svgSprite,
    NMZ.imageminFrontend,
    NMZ.imageminBackend,
    NMZ.assets,
    NMZ.babelFrontend,
]);

gulp.task('watch', function(){
    gulp.watch(
        WTCH.frontend.dev.sass,
        [NMZ.sassFrontend]
    );
    gulp.watch(
        WTCH.backend.dev.sass,
        [NMZ.sassBackend]
    );
    gulp.watch(
        WTCH.frontend.dev.sassCd,
        [NMZ.sassCd]
    );
    gulp.watch(
        WTCH.frontend.dev.icons,
        [NMZ.svgSprite]
    );
    gulp.watch(
        [WTCH.backend.dev.images, WTCH.backend.dev.tempImages],
        [NMZ.imageminBackend]
    );
    gulp.watch(
        [WTCH.frontend.dev.images, WTCH.frontend.dev.tempImages],
        [NMZ.imageminFrontend]
    );
    gulp.watch(
        WTCH.frontend.dev.fonts,
        [NMZ.assets]
    );
    gulp.watch(
        WTCH.frontend.dev.babel,
        [NMZ.babelFrontend]
    );
    helper.deleteListener(
        WTCH.frontend.dev.images,
        WTCH.frontend.dist.images
    );
    helper.deleteListener(
        WTCH.frontend.dev.tempImages,
        WTCH.frontend.dist.images
    );
    helper.deleteListener(
        WTCH.backend.dev.images,
        WTCH.backend.dist.images
    );
    helper.deleteListener(
        WTCH.frontend.dev.fonts,
        WTCH.frontend.dist.fonts
    );
});

helper.lazyTask(NMZ.sassFrontend, './sass', {
    src: TSK.sassFrontend.src,
    dst: TSK.sassFrontend.dst
});

helper.lazyTask(NMZ.sassBackend, './sass', {
    src: TSK.sassBackend.src,
    dst: TSK.sassBackend.dst
});

helper.lazyTask(NMZ.sassCd, './sass', {
    src: TSK.sassCd.src,
    dst: TSK.sassCd.dst
});

helper.lazyTask(NMZ.clean, './clean', TSK.clean.all);

helper.lazyTask(NMZ.svgSprite, './svg-sprite', {
    src: TSK.svgSprite.src,
    dst: TSK.svgSprite.dst,
    examplePath: TSK.svgSprite.examplePath
});

helper.lazyTask(NMZ.imageminFrontend, './imagemin', {
    src: TSK.imgminFrontend.src,
    dst: TSK.imgminFrontend.dst
});

helper.lazyTask(NMZ.imageminBackend, './imagemin', {
    src: TSK.imgminBackend.src,
    dst: TSK.imgminBackend.dst
});

helper.lazyTask(NMZ.assets, './copy', {
    src: TSK.assets.src,
    dst: TSK.assets.dst
});

helper.lazyTask(NMZ.babelFrontend, './babel', {
    src: TSK.babelFrontend.src,
    dst: TSK.babelFrontend.dst
});


