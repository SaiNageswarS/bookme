var gulp = require('gulp');

module.exports = function(options) {
  options.src = options.src || 'src/**/*.html';
  options.dest = options.dest || 'public/build';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest));
};
