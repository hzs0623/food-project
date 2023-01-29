const through = require('through2');
const gutil = require('gulp-util');

const insertStr = (soure, start, newStr) => {
  return soure.slice(0, start) + newStr + soure.slice(start);
};

function createArSrc(str = '', all, suffix) {
  function allClassName(str) {
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

    const classNames = findClassNames(str);
    classNames.forEach((name) => {
      str = str.replace(name, `${name.trim()}${suffix}`);
    });
    return str;
  }

  function pageSignClassName(str) {
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

    str = insertStr(str, endIndex + 1, `  \n  direction: rtl;`);
    return str.replace(className, `${className.trim()}${suffix}`);
  }

  return all ? allClassName(str) : pageSignClassName(str);
}

/**
 * 职责：将less文件内容 在第一个类名上加上:   -ar
 * all（true: 为所有.开头的类加上标识， false： 只为第一个加上标识）
 * suffix: 为每一个类加上的后缀
 * */
module.exports = function ({ all = false, suffix = '' } = {}) {
  const newFile = [];

  return through.obj(
    function write(file, enc, done) {
      if (file.path !== 'undefined') {
        const strs = createArSrc(file.contents.toString(), all, suffix);
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
