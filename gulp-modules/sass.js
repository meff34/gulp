"use strict";

var GLP = require('gulp-load-plugins')();
var gulp = require('gulp');

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
        return gulp.src(options.src)
            .pipe(GLP.plumber({
                errorHandler: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(GLP.sourcemaps.init())
            .pipe(GLP.sass({
                    outputStyle: 'nested'
                })
                .on('error', function (e) {
                    return GLP.notify().write(e);
                })
            )
            .pipe(GLP.importCss())
            .pipe(GLP.autoprefixer(tools.configAutoprefixer))
            .pipe(GLP.concatUtil.header('/* !!! WARNING !!! \nThis file is auto-generated. \nDo not edit it or else you will lose changes next time you compile! */\n\n'))
            .pipe(GLP.pxtorem(tools.configPxtorem))
            .pipe(GLP.if(
                (options.minify),
                GLP.minifyCss()
            ))
            .pipe(GLP.if(
                (options.newName !== undefined),
                GLP.rename(options.newName)
            ))
            .pipe(GLP.sourcemaps.write('./maps'))
            .pipe(gulp.dest(options.dst))
            .pipe(GLP.notify(({message: 'task ' + options.taskname + ' is complited', onLast: true})));
    };
}