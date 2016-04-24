var gulp = require('gulp');

module.exports = function(options) {
  options.src = options.src || 'node_modules/angular2/bundles/angular2-polyfills.js';
  options.dest = options.dest || 'public/build/js';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest));
};
