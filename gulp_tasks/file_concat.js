'use strict';

var through = require('through2');
const gutil = require('gulp-util');

module.exports = function (fileName) {
  const fileMap = {};

  function bufferContents(file, enc, cb) {
    const path = file.path.replace(file.basename, '');
    const item = fileMap[path];

    if (item) {
      fileMap[path] = {
        ...item,
        contents: `${item.contents}\n${file.contents.toString()}`,
      };
    } else {
      fileMap[path] = {
        path: file.path.replace(file.basename, fileName),
        contents: file.contents.toString(),
      };
    }

    cb();
  }

  function endStream(cb) {
    Object.keys(fileMap).forEach((k) => {
      const el = fileMap[k];
      this.push(
        new gutil.File({
          path: el.path,
          contents: new Buffer.from(el.contents),
        }),
      );
    });
    cb();
  }

  return through.obj(bufferContents, endStream);
};
