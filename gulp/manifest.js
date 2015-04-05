var path = require('path');
var fs = require('fs');

var gulp = require('gulp');

var packageInfo = require('../package.json');

gulp.task('manifest', ['build:cleanup', 'build:mkdir'], function(callback) {
  var targetPath = path.resolve(__dirname, '../build/manifest.json');

  /*eslint camelcase: 0*/
  var manifest = {
    manifest_version: 2,
    name: packageInfo.name.toUpperCase(),
    version: packageInfo.version,
    minimum_chrome_version: '40',
    description: packageInfo.description,
    author: packageInfo.author,
/*    options_ui: {
      page: 'options/index.html',
      chrome_style: true,
      open_in_tab: true // temporary
    },
*/
    "content_scripts":
      [
        {
          "matches": ["*://*/*"],
          "js": ["script.js"],
          "run_at": "document_end"
        }
      ]
  };

  fs.writeFile(targetPath, JSON.stringify(manifest, null, '  '), {}, callback);
});

gulp.task('manifest:watch', function() {
  gulp.watch(__filename, gulp.series('manifest'));
});
