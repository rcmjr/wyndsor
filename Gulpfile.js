'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
//var autoprefixer = require('gulp-autoprefixer');

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

gulp.task('workflow', function () {
  gulp.src([
    '**/*.scss',
    '!node_modules/**/*.scss',
    '!_Dev/*.scss'
  ])
  // Insert tasks here
  .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
  //  .pipe(autoprefixer({ browsers: ['last 2 versions'],cascade: true}))
    .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./test/'))
});

gulp.task('default', function () {
  gulp.watch('./**/*.scss', ['workflow']);
});
