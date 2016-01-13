var glob = require('glob');
var fs = require('fs');

module.exports = {

    trash: [],	// Trash queue for cleanup later
    dumbDirs: ['tmp', 'tmp/dump'],

    makeTmpDir: function(){
        var dirs = this.dumbDirs;

        for( var i in dirs ) {
            if ( dirs.hasOwnProperty(i) ) {
                var path = __dirname + '/' + dirs[i];

                try {
                    fs.statSync(path);
                } catch(e) {
                    fs.mkdirSync(path);
                }

                // Add to trash queue
                this.trash.push(path);
            }
        }
    },

    /**
     *
     * @param {int} count How many to create
     * @returns {undefined}
     */
    makeDummyFiles: function(count, ext, subdir) {
        for (var i = 1; i <= count; i++) {
            var dir = __dirname + '/tmp/' + (subdir || '');

            fs.writeFileSync(dir + '/' + i + '.' + ext, ':D');
        }
    },

    cleanUp: function(){
        this.deleteFolderRecursive(__dirname + '/tmp');
    },

    deleteFolderRecursive : function (path) {
        var self = this;

        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    self.deleteFolderRecursive(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
};
