"use strict";

var GLP = require('gulp-load-plugins')();
var gulp = require('gulp');

module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe(GLP.debug({title: 'вход'}))
            .pipe(GLP.newer(options.dst))
            .pipe(GLP.imagemin({
                progressive: true,
                svgoPlugins: [
                    {removeViewBox: true},
                    {cleanupIDs: true}
                ],
            }))
            .pipe(gulp.dest(options.dst))
            .pipe(GLP.debug({title: 'выход'}));
    };
}