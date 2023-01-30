const through = require('through2');
const gutil = require('gulp-util');

function createArSrc(str = '') {
  let startIndex;
  let endIndex;
  for (let i = 0; i < str.length; i++) {
    const item = str[i];
    if (!startIndex && item === '.') {
      startIndex = i;
    }
    if (!endIndex && item === '{') {
      endIndex = i;
      break;
    }
  }
  const className = str.substring(startIndex, endIndex);
  str = str.replace(className, `${className.trim()}-ar`);
  return str;
}

// 职责：将less文件内容 在第一个类名上加上:   -ar
module.exports = function () {
  let newFile = {};

  return through.obj(
    function write(file, enc, done) {
      if (file.path !== 'undefined') {
        const strs = createArSrc(file.contents.toString());
        newFile = {
          path: file.path,
          contents: new Buffer.from(strs),
        };
      }
      done();
    },
    function flush(done) {
      this.push(new gutil.File(newFile));
      done();
    },
  );
};
