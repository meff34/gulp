"use strict";

var gulp = require('gulp');
var combiner = require('stream-combiner2').obj;

module.exports = function(options) {
    return function() {
        return combiner(
            gulp.src(options.src),
            gulp.dest(options.dst)
        ).on('error', GLP.notify.onError(function (err) {
            return {
                title: options.taskname,
                message: err.message
            };
        }));
    };
};