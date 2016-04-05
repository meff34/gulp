"use strict";

var GLP = require('gulp-load-plugins')();
var gulp = require('gulp');
var combiner = require('stream-combiner2').obj;

module.exports = function(options) {
    var tools = {
        configSvg: {
            mode: {
                symbol: {
                    dest: './',
                    example: true,
                    bust: false,
                    sprite: 'sprite.svg',
                    inline: false,
                    render: {}
                }
            }
        }
    };

    return function() {
        return combiner(
            gulp.src(options.src),
            GLP.svgSprite(tools.configSvg),
            GLP.if('sprite.svg', gulp.dest(options.dst), gulp.dest(options.examplePath))
        ).on('error', GLP.notify.onError(function (err) {
            return {
                title: options.taskname,
                message: err.message
            };
        }));
    };
}