"use strict";

/*
* TODO: resolve trouble with deleting on watching directory
* https://github.com/nodejs/node-v0.x-archive/issues/4337
*/

var helper = {};
var gulp = require('gulp');
var path = require('path');
var del = require('del');
var chalk = require('chalk');
var isProduction = require('gulp-environments').production() ? true : false;

(function modeLog(flag) {
    var prefix = chalk.red('\n    mode: '),
        postfix = chalk.magenta('\n'),
        productionMessage = chalk.blue('production'),
        developmentMessage = chalk.green('develop');

    if (flag) {
        console.log(prefix + productionMessage + postfix);
    } else {
        console.log(prefix + developmentMessage + postfix);
    }
})(isProduction);

helper.lazyTask = function(taskName, path, options){
    options = options || {};
    options.taskname = taskName;
    options.isProduction = isProduction;
    gulp.task(taskName, function(callback) {
        var task = require(path).call(this, options);

        return task(callback);
    })
};

helper.deleteListener = function (src, dst) {
    var watcher = gulp.watch(src);

    watcher.on('change', function (event) {
        var isDeleted = (event.type === 'deleted');
        var eventPath = event.path;

        function listener(src, dst) {
            var filePathFromSrc = path.relative(path.resolve(src), eventPath);
            var destFilePath = path.resolve(dst, filePathFromSrc);
            del(destFilePath);
        }

        if ((isDeleted) && (Array.isArray(src))) {
            src.forEach(function(srcItem) {
                listener(srcItem, dst);
            });
        } else if ((isDeleted)) {
             listener(src, dst);
        }
    });
};

module.exports = helper;