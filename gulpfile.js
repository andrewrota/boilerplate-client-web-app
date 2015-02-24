/* global require, __dirname,  */
(function() {
  'use strict';
  var gulp = require('gulp');
  var sass = require('gulp-ruby-sass');
  var del = require('del');
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');
  var rename = require('gulp-rename');
  var webpack = require('gulp-webpack');
  var scsslint = require('gulp-scss-lint');
  var minifyCSS = require('gulp-minify-css');
  var sourcemaps = require('gulp-sourcemaps');
  require('jsx-loader');


  var paths = {
    html: ['src/**/*.html'],
    scripts: ['src/js/**/*.js'],
    scriptInit: 'init.js',
    styles: 'src/sass/*.scss',
    fonts: 'src/**/*.woff',
    images: ['src/images/**/*']
  };
  // webpack
  gulp.task('webpack', function() {
    del(['dist/**/*.js']);
    return gulp.src(paths.scripts).pipe(webpack({
      module: {
        preloaders: [
          {
            test: /\.jsx?$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
          }
        ],
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel-loader?experimental&optional=selfContained',
            exclude: /node_modules/
          }
        ]
      },
      context: __dirname + '/src',
      devtool: '#source-map',
      output: {
        path: __dirname + '/dist/js',
        filename: 'bundle.js'
      }
    })).pipe(gulp.dest('dist/js'));
  });
  gulp.task('clean-dist', function() {
    del('dist');
  });
  gulp.task('html', function() {
    del(['dist/**/*.html']);
    return gulp.src(paths.html).pipe(gulp.dest('dist/'));
  });
  gulp.task('images', function() {
    del(['dist/images']);
    return gulp.src(paths.images).pipe(gulp.dest('dist/images'));
  });
  gulp.task('fonts', function() {
    del(['dist/fonts']);
    return gulp.src(paths.fonts).pipe(gulp.dest('dist/fonts'));
  });
  gulp.task('sass', function() {
    del(['dist/css']);
    return gulp.src(paths.styles)
      .pipe(scsslint())
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest('dist/css/'));
  });

  gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['webpack']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.styles, ['sass']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.fonts, ['fonts']);
  });
  gulp.task('build', ['webpack', 'sass', 'html', 'images', 'fonts']);
  gulp.task('default', ['watch', 'build']);
}());