"use strict";

var GLP = require('gulp-load-plugins')();
var gulp = require('gulp');
var combiner = require('stream-combiner2').obj;

module.exports = function(options) {

    return function() {
        return combiner(
            gulp.src(options.src),
            GLP.if(!options.isProduction, GLP.sourcemaps.init()),
            GLP.if(!options.isProduction, GLP.newer(options.dst)),
            GLP.babel({
                presets: ['es2015']
            }),
            GLP.if(options.isProduction, GLP.uglify()),
            GLP.if(!options.isProduction, GLP.sourcemaps.write('./maps')),
            gulp.dest(options.dst)
        ).on('error', GLP.notify.onError(function (err) {
            return {
                title: options.taskname,
                message: err.message
            };
        }));
    };
};
