"use strict";

var gulp = require('gulp');
var GLP = require('gulp-load-plugins')();
// var combiner = require('stream-combiner2').obj;

module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe(GLP.newer(options.dst))
            .pipe(GLP.plumber({
                errorHandler: function (err) {
                    //GLP.notify().write(err);
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(gulp.dest(options.dst));
    };
};