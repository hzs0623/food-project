'use strict';

var through = require('through2');
var Concat = require('concat-with-sourcemaps');

module.exports = function (fileName) {
  var latestFile;
  var latestMod;
  var concat;

  function bufferContents(file, enc, cb) {
    if (!latestMod || (file.stat && file.stat.mtime > latestMod)) {
      latestFile = file;
      latestMod = file.stat && file.stat.mtime;
    }
    if (!concat) {
      concat = new Concat();
    }

    concat.add(file.relative, file.contents); // 将多个文件合并
    cb();
  }

  function endStream(cb) {
    const joinedFile = latestFile.clone({ contents: false });
    joinedFile.path = joinedFile.path.replace(joinedFile.basename, fileName);
    joinedFile.contents = concat.content;
    this.push(joinedFile);
    cb();
  }

  return through.obj(bufferContents, endStream);
};
