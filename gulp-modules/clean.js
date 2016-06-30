"use strict";

var del = require('del');

module.exports = function(options) {
    return function() {
        return del.sync(options);
    };
}