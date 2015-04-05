var path   		= require('path'),
    fs     		= require('fs'),
    gulp   		= require('gulp'),
    rimraf 		= require('rimraf'),
    gulpWebpack = require('gulp-webpack'),
    webpack 	= require('webpack');

var webpackConfig = require('./gulp/_webpack');

var ChromeExtension = require("crx");

var crx = new ChromeExtension({
	privateKey: fs.readFileSync(path.join(process.env["HOME"],".ssh/ChromeApps.pem"))
});

var packageInfo = require('./package.json');

// includes
require('./gulp/manifest');

var buildPath = path.resolve(__dirname, 'build');

function buildScripts(watch) {
  return gulp.src('src/index.js')
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

gulp.task('crx', ['build-scripts'], function() {
  crx.load(path.join(__dirname, 'build'))
  .then(function() {
    return crx.pack().then(function(crxBuffer){
      fs.writeFile(path.join(__dirname, packageInfo.name + ".crx"), crxBuffer)
    })
  });
})

gulp.task(
    'build',
    ['manifest', 'build-scripts', 'crx']
    );
