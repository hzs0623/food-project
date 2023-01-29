const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefix = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');

gulp.task('less-autoprefix', function () {
  return gulp
    .src(['pages/**/*.less', 'components/**/*.less']) //待处理的目标目录下的所有less文件
    .pipe(less()) //采用less的默认方式处理less产出css
    .pipe(cssnano()) //如果使用cssnano需要在autoprefix之前调用，否则后者无效
    .pipe(
      autoprefix({
        //自动添加兼容浏览器的样式前缀，例如：-webkit-, -mo-
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(
      rename(function (path = {}) {
        path.extname = '.wxss';
      }),
    )
    .pipe(
      // 打包到原目录中
      gulp.dest(function (file) {
        return file.base;
      }),
    );
});
