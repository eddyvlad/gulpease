var glob = require('glob');
var fs = require('fs');

function watch(glob_expr) {
    var self = this;
    this.glob_expr = glob_expr = (typeof glob_expr === 'string' ? new Array(glob_expr) : glob_expr);
    this.watching = [];

    glob_expr.forEach(function (expr) {
        var files = glob.sync(expr);
        console.log(files);
        files.forEach(function (path) {
            self.watching.push(path);
        });
    });
};

watch.prototype = {
    unWatch: function () {

    },
    onChange: function () {
    }
};

module.exports = watch;