"use strict";

/*
* TODO: resolve trouble with deleting on watching directory
* https://github.com/nodejs/node-v0.x-archive/issues/4337
*/

var helper = {};
var gulp = require('gulp');
var path = require('path');
var del = require('del');

helper.lazyTask = function(taskName, path, options){
    options = options || {};
    options.taskname = taskName;
    gulp.task(taskName, function(callback) {
        var task = require(path).call(this, options);

        return task(callback);
    })
};

helper.deleteListener = function (src, dst) {
    var watcher = gulp.watch(src);

    watcher.on('change', function (event) {
        if (event.type === 'deleted') {
            var filePathFromSrc = path.relative(path.resolve(src), event.path);
            var destFilePath = path.resolve(dst, filePathFromSrc);
            del(destFilePath);
        }
    });
};

module.exports = helper;