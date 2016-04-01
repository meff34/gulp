"use strict";

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

/*TODO: решить проблему с путями*/

helper.deleteListener = function (src, task) {
    var watcher = gulp.watch(src, task);

    watcher.on('change', function (event) {
        if (event.type === 'deleted') {
            console.log(event);
            var filePathFromSrc = path.relative(path.resolve('c:/openserver/domains/barbers/frontend/web/dev/images'), event.path);
            console.log('\n' + filePathFromSrc);
            var destFilePath = path.resolve('c:/openserver/domains/barbers/frontend/web/dist/images', filePathFromSrc);
            console.log('\n' + destFilePath);
            del(destFilePath);
        }
    });
};

module.exports = helper;