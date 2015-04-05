var path   		= require('path'),
    fs     		= require('fs'),
    gulp   		= require('gulp'),
    rimraf 		= require('rimraf'),
    gulpWebpack = require('gulp-webpack'),
    webpack 	= require('webpack');

var webpackConfig = require('./gulp/_webpack');

// includes
require('./gulp/manifest');

var buildPath = path.resolve(__dirname, 'build');

function buildScripts(watch) {
  return gulp.src('src/content_script.js')
    .pipe(gulpWebpack(
          webpackConfig({
            watch: watch,
            output: {
              filename: 'script.js'
            }
          })
    ))
    .pipe(gulp.dest('build/'));
}

gulp.task('build-scripts', ['build:mkdir'], function() {
	return buildScripts();
});

gulp.task('build:cleanup', function(callback) {
  rimraf('build', callback);
});

gulp.task('build:mkdir', ['build:cleanup'], function(callback) {
  fs.exists(buildPath, function(exists) {
    if (!exists) {
      fs.mkdir(buildPath, callback);
    } else {
      callback();
    }
  });
});

gulp.task(
    'build',
    ['manifest', 'build-scripts']
    );
