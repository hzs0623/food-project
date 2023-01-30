const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefix = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const { importLess, wariteAr } = require('./gulp_tasks/index.js');
const concat = require('gulp-concat');

const argv = require('minimist')(process.argv.slice(2));
const isReverse = argv.reverse === 'true';

gulp.task('less-autoprefix', function () {
  if (isReverse) {
    return gulp
      .src(['pages/**/*.less', 'components/**/*.less']) //待处理的目标目录下的所有less文件
      .pipe(wariteAr())
      .pipe(importLess(['less/global-ar.less']))
      .pipe(less())
      .pipe(cssnano()) // 压缩css(需要在autoprefix之前调用，否则后者无效)
      .pipe(
        autoprefix({
          //自动添加兼容浏览器的样式前缀，例如：-webkit-, -mo-
          browsers: ['last 2 versions'],
          cascade: false,
        }),
      )
      .pipe(
        rename(function (path = {}) {
          path.extname = '-ar.css';
        }),
      )
      .pipe(
        // 打包到原目录中
        gulp.dest(function (file) {
          return file.base;
        }),
      );
  }

  return gulp
    .src(['pages/**/*.less', 'components/**/*.less']) //待处理的目标目录下的所有less文件
    .pipe(importLess(['less/global.less']))
    .pipe(less())
    .pipe(cssnano()) // 压缩css(需要在autoprefix之前调用，否则后者无效)
    .pipe(
      autoprefix({
        //自动添加兼容浏览器的样式前缀，例如：-webkit-, -mo-
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(
      rename(function (path = {}) {
        path.extname = '.css';
      }),
    )
    .pipe(
      gulp.dest(function (file) {
        return file.base;
      }),
    );
});

// 待办： 打包到同一个目录下
gulp.task('css', function () {
  return gulp
    .src([
      'pages/**/*.css',
      'components/**/*.css',
      'pages/**/*-ar.css',
      'components/**/*-ar.css',
    ])
    .pipe(concat('index1.wxss')) //通过concat将css文件拼接成一个叫做style.css的文件
    .pipe(
      gulp.dest((file) => {
        return file.base;
      }),
    );
});
