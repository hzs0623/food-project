const through = require('through2');
const gutil = require('gulp-util');

/**
 * 读写less文件。
 * */
module.exports = function (importNames = []) {
  const newFile = [];

  return through.obj(
    function write(file, enc, done) {
      if (file.path !== 'undefined') {
        let imports = '';
        importNames.forEach((src) => {
          imports = `${imports}@import "${src}";` + `\n`;
        });
        if (file.contents) {
          imports += file.contents?.toString();
        }

        newFile.push(
          new gutil.File({
            path: file.path,
            contents: new Buffer.from(imports),
          }),
        );
      }
      done();
    },
    function flush(done) {
      newFile.forEach((el) => {
        this.push(el);
      });
      done();
    },
  );
};
