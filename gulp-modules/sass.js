"use strict";

var GLP = require('gulp-load-plugins')();
var gulp = require('gulp');
var combiner = require('stream-combiner2').obj;

module.exports = function(options) {
    var tools = {
        configAutoprefixer: {
            browsers: ['last 5 versions'],
            cascade: true
        },
        configPxtorem: {
            rootValue: 10,
            unitPrecision: 5,
            propWhiteList: [
                'font',
                'font-size',
                'line-height',
                'letter-spacing',
                'margin',
                'margin-top',
                'margin-right',
                'margin-bottom',
                'margin-left',
                'padding',
                'padding-top',
                'padding-right',
                'padding-bottom',
                'padding-left'
            ],
            selectorBlackList: [
                'html'
            ],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        }
    };
   
    return function() {
        return combiner(
            gulp.src(options.src),
            GLP.sourcemaps.init(),
            GLP.sass({
                outputStyle: 'nested'
            }),
            GLP.importCss(),
            GLP.autoprefixer(tools.configAutoprefixer),
            GLP.concatUtil.header('/* This file is generated — do not edit by hand! */\n'),
            GLP.pxtorem(tools.configPxtorem),
            GLP.if(
                (options.minify),
                GLP.minifyCss()
            ),
            GLP.if(
                (options.newName !== undefined),
                GLP.rename(options.newName)
            ),
            GLP.sourcemaps.write('./maps'),
            gulp.dest(options.dst)
        ).on('error', GLP.notify.onError(function (err) {
            return {
                title: options.taskname,
                message: err.message
            };
        }));
    };
};

//
