'use strict';

var GLP = require('gulp-load-plugins')();
var gulp = require('gulp');

module.exports = function(options) {
    var config = {
        svg: {
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
        return gulp.src(options.src)
            .pipe(GLP.plumber({
                errorHandler: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(GLP.svgSprite(config.svg))
            .pipe(GLP.if('sprite.svg', gulp.dest(options.dst), gulp.dest(options.examplePath)))
            .pipe(GLP.notify(({message: 'task ' + options.taskname + ' is complited', onLast: true})));
    };
}