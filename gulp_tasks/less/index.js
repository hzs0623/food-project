const through = require('through2');
const gutil = require('gulp-util');
var less = require('less');
const reverseLess = require('./reverseLess');

const getImportLessStr = (str, importNames = []) => {
  let imports = '';
  importNames.forEach((src) => {
    imports = `${imports}@import "${src}";` + `\n`;
  });

  return imports + str;
};

function renderLess(str) {
  return new Promise(function (resolve, reject) {
    less.render(str, { compress: false, paths: [] }, function (err, res) {
      if (err || !res.css) {
        reject(err);
      } else {
        resolve(res.css);
      }
    });
  });
}

module.exports = function ({ addFiles } = {}) {
  const newFile = [];
  return through.obj(
    async function write(file, _, done) {
      if (file.path === 'undefined') return done();
      const { global, defaluts = [], reverses = [] } = addFiles;
      const contents = file.contents.toString();
      const reverseContents = reverseLess(contents);

      // 处理less打包
      const [defaultsStr, reversesStr] = await Promise.all([
        renderLess(getImportLessStr(contents, [...global, ...defaluts])),
        renderLess(getImportLessStr(reverseContents, [...global, ...reverses])),
      ]);

      const strs = `${defaultsStr} \n ${reversesStr}`;

      newFile.push(
        new gutil.File({
          path: file.path,
          contents: new Buffer.from(strs),
        }),
      );
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
