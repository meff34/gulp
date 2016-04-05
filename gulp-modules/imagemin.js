"use strict";

var GLP = require('gulp-load-plugins')();
var gulp = require('gulp');
var combiner = require('stream-combiner2').obj;

module.exports = function(options) {
    return function() {
        return combiner(
            gulp.src(options.src),
            GLP.newer(options.dst),
            GLP.imagemin({
                progressive: true,
                svgoPlugins: [
                    {removeViewBox: true},
                    {cleanupIDs: true}
                ]
            }),
            gulp.dest(options.dst)
        ).on('error', GLP.notify.onError(function (err) {
            return {
                title: options.taskname,
                message: err.message
            };
        }));
    };
}