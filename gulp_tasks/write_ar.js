const through = require('through2');
const gutil = require('gulp-util');

function findClassNames(str) {
  const classNames = [];
  let startIndex;
  for (let i = 0; i < str.length; i++) {
    const item = str[i];
    if (!startIndex && item === '.') {
      startIndex = i;
    }
    if (typeof startIndex !== 'undefined' && item === '{') {
      classNames.push(str.substring(startIndex, i));
      startIndex = undefined;
    }
  }
  return classNames;
}

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

  const classNames = findClassNames(str);
  classNames.forEach((name) => {
    str = str.replace(name, `${name.trim()}-ar`);
  });

  return str;
}

// 职责：将less文件内容 在第一个类名上加上:   -ar
module.exports = function () {
  const newFile = [];

  return through.obj(
    function write(file, enc, done) {
      if (file.path !== 'undefined') {
        const strs = createArSrc(file.contents.toString());
        newFile.push(
          new gutil.File({
            path: file.path,
            contents: new Buffer.from(strs),
          }),
        );
      }
      done();
    },

    function flush(done) {
      newFile.forEach((file) => {
        this.push(file);
      });
      done();
    },
  );
};
