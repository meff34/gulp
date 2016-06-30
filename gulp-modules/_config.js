"use strict";

var config = {
    watchPaths: {
        frontend: {
            dev: {
                sass: 'frontend/web/dev/sass/**/*.{sass,css}',
                sassCd: 'frontend/web/dev/sass/content-design.sass',
                icons: 'frontend/web/dev/icons/*.svg',
                images: ['frontend/web/dev/images/**/*.{jpg,png,svg,gif}', 'frontend/web/dev/images/*.{jpg,png,svg,gif}'],
                tempImages: ['frontend/web/dev/temp-images/**/*.{jpg,png,svg,gif}', 'frontend/web/dev/temp-images/*.{jpg,png,svg,gif}'],
                fonts: 'frontend/web/dev/fonts/*.{eot,svg,ttf,woff,woff2}',
                babel: 'frontend/web/dev/es6/*.js'
            },
            dist: {
                css: 'frontend/web/dist/css/**/*.{css}',
                cssMaps: 'frontend/web/dist/css/**/*.{map}',
                fonts: 'frontend/web/dist/fonts/**/*.{eot,svg,ttf,woff,woff2}',
                sprite: 'frontend/web/dist/sprite/*.{svg}',
                images: 'frontend/web/dist/images/**/*.{jpg,png,svg,gif}'
            }
        },
        backend: {
            dev: {
                sass: 'backend/web/dev/sass/**/*.{sass,css}',
                icons: 'backend/web/dev/icons/*.svg',
                images: 'backend/web/dev/images/**/*.{jpg,png,svg,gif}',
                tempImages: 'backend/web/dev/temp-images/**/*.{jpg,png,svg,gif}',
                fonts: 'backend/web/dev/fonts/**/*.{eot,svg,ttf,woff,woff2}'
            },
            dist: {
                css: 'backend/web/dist/css/**/*.{css}',
                cssMaps: 'backend/web/dist/css/**/*.{map}',
                fonts: 'backend/web/dist/fonts/**/*.{eot,svg,ttf,woff,woff2}',
                sprite: 'backend/web/dist/sprite/*.{svg}',
                images: 'backend/web/dist/images/**/*.{jpg,png,svg,gif}'
            }
        }
    },
    
    tasksPaths: {
        sassFrontend: {
            src: 'frontend/web/dev/sass/main.sass',
            dst: 'frontend/web/dist/css'
        },
        sassBackend: {
            src: 'backend/web/dev/sass/main.sass',
            dst: 'backend/web/dist/css'
        },
        sassCd: {
            src: 'frontend/web/dev/sass/content-design.sass',
            dst: 'backend/web/dist/css'
        },
        clean: {
            all: [
                'frontend/web/dist/css',
                'frontend/web/dist/fonts',
                'frontend/web/dist/images',
                'frontend/web/dist/js',
                'frontend/web/dist/sprite',
                'frontend/web/temp',
                // 'backend/web/dist/css',
                // 'backend/web/dist/fonts',
                // 'backend/web/dist/images'
            ]
        },
        svgSprite: {
            src: 'frontend/web/dev/icons/*.svg',
            dst: 'frontend/web/dist/sprite',
            examplePath: 'frontend/web/temp'
        },
        imgminFrontend: {
            src: [
                'frontend/web/dev/temp-images/**/*.*',
                'frontend/web/dev/images/**/*.*'
            ],
            dst: 'frontend/web/dist/images'
        },
        imgminBackend: {
            src: [
                'backend/web/dev/temp-images/**/*.*',
                'backend/web/dev/images/**/*.*'
            ],
            dst: 'backend/web/dist/images'
        },
        assets: {
            src: 'frontend/web/dev/fonts/*.{eot,svg,ttf,woff,woff2}',
            dst: 'frontend/web/dist/fonts/'
        },
        babelFrontend: {
            src: 'frontend/web/dev/es6/*.js',
            dst: 'frontend/web/dist/js/'
        }
    },
    
    taskNames: {
        clean: 'clean',
        sassFrontend: 'sass:frontend',
        sassBackend: 'sass:backend',
        sassCd: 'sass:cd',
        svgSprite: 'svg:sprite',
        imageminFrontend: 'imagemin:frontend',
        imageminBackend: 'imagemin:backend',
        assets: 'assets',
        babelFrontend: 'babel:frontend'
    }
};


module.exports = config;
