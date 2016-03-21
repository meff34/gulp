"use strict";

var GLP = require('gulp-load-plugins')();
var gulp = require('gulp');

module.exports = function(options) {
    var tools = {
        configAutoprefixer: {
            browsers: ['last 8 versions'],
            cascade: true
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
            .pipe(GLP.if(
                (options.maps),
                GLP.sourcemaps.init()
            ))
            .pipe(GLP.sass({
                    outputStyle: 'nested',
                })
                .on('error', function (e) {
                    return GLP.notify().write(e);
                })
            )
            .pipe(GLP.importCss())
            .pipe(GLP.autoprefixer(tools.configAutoprefixer))
            .pipe(GLP.concatUtil.header('/* !!! WARNING !!! \nThis file is auto-generated. \nDo not edit it or else you will lose changes next time you compile! */\n\n'))
            .pipe(GLP.if(
                (options.minify),
                GLP.minifyCss()
            ))
            .pipe(GLP.if(
                (options.newName !== undefined),
                GLP.rename(options.newName)
            ))
            .pipe(GLP.if(
                (options.maps),
                GLP.sourcemaps.write('./maps')
            ))
            .pipe(gulp.dest(options.dst))
            .pipe(GLP.notify(({message: 'task ' + options.taskname + ' is complited', onLast: true})));
    };
}