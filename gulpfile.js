const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const { importLess, wariteAr } = require('./gulp_tasks/index.js');
const concat = require('./gulp_tasks/file_concat');
const clean = require('gulp-clean');
const argv = require('minimist')(process.argv.slice(2));

const lessar = function () {
  return gulp
    .src(['pages/**/*.less', 'components/**/*.less']) //待处理的目标目录下的所有less文件
    .pipe(wariteAr({ suffix: '-ar', all: false }))
    .pipe(importLess(['less/global-ar.less']))
    .pipe(less())
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
};

gulp.task('less', function () {
  const isReverse = argv.reverse === 'true';
  if (isReverse) {
    return lessar();
  }

  return gulp
    .src(['pages/**/*.less', 'components/**/*.less']) //待处理的目标目录下的所有less文件
    .pipe(importLess(['less/global.less']))
    .pipe(less())
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

gulp.task('less-ar', lessar);

const importless = [
  'pages/**/*.css',
  'components/**/*.css',
  'pages/**/*-ar.css',
  'components/**/*-ar.css',
];
gulp.task('css', function () {
  return gulp
    .src(importless)
    .pipe(concat('index.wxss'))
    .pipe(
      gulp.dest((file) => {
        return file.base;
      }),
    );
});

gulp.task('clean', function () {
  return gulp.src(importless, { read: false }).pipe(clean());
});

gulp.task('watch', function () {
  console.log('gulp watch 监听打包开始👁');
  gulp
    .watch(['pages/**/*.less', 'components/**/*.less'])
    .on('change', function () {
      console.log('watch less', '🚀🚀');
      const runTasks = gulp.series(['less', 'less-ar', 'css', 'clean']);
      runTasks();
    });
});
