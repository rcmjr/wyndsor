'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var changedInPlace = require('gulp-changed-in-place');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};
var SRC = ['**/*.scss',
            '!node_modules/**/*.scss',
            '!_Dev/*.scss'];
var DEST = './css/';

gulp.task('workflow', function () {
  gulp.src(SRC)
        .pipe(changedInPlace())
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(DEST))
      });

gulp.task('default', function () {
  gulp.watch('./**/*.scss', ['workflow']);
});
