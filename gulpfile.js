const gulp = require('gulp');
const rename = require('gulp-rename');
const lessImport = require('./gulp_tasks/less');
// const argv = require('minimist')(process.argv.slice(2));

gulp.task('less', () => {
  return gulp
    .src(['pages/**/*.less', 'components/**/*.less']) //待处理的目标目录下的所有less文件
    .pipe(
      lessImport({
        addFiles: {
          global: ['less/global.less'], // 公共配置
          defaluts: ['less/defaluts.less'], // 正常布局less
          reverses: ['less/reverse.less'], // 反向部署less
        },
      }),
    )
    .pipe(
      rename(function (path = {}) {
        path.extname = '.wxss';
      }),
    )
    .pipe(
      gulp.dest(function (file) {
        return file.base;
      }),
    );
});

gulp.task('watch', function () {
  gulp
    .watch(['pages/**/*.less', 'components/**/*.less'])
    .on('change', function () {
      console.log('watch less', '🚀🚀');
      const runTasks = gulp.series(['less']);
      runTasks();
    });
});
