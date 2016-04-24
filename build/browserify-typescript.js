var gulp = require('gulp'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  tsify = require('tsify'),
  pretty = require('prettysize'),
  assign = require('lodash.merge'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourcemaps = require('gulp-sourcemaps'),
  gulpif = require('gulp-if'),
  lazypipe = require('lazypipe');

var defaultOptions = {
  watch: false,
  src: ['./src/app.ts', './typings/main.d.ts'],
  outputPath: 'public/build/js/',
  outputFile: 'app.bundle.js',
  browserifyOptions: {
    cache: {},
    packageCache: {},
    debug: true
  },
  watchifyOptions: {},
  tsifyOptions: {},
  onError: function(err){ console.error(err.toString()); },
  onLog: function(log){
    console.log((log = log.split(' '), log[0] = pretty(log[0]), log.join(' ')));
  }
};

module.exports = function(options) {
  var options = assign(defaultOptions, options);
  var sourcemapPipe = lazypipe()
    .pipe(buffer)
    .pipe(sourcemaps.init, { loadMaps: true })
    .pipe(sourcemaps.write, './');

  var b = browserify(options.src, options.browserifyOptions)
    .plugin(tsify, options.tsifyOptions);

  if (options.watch) {
    b = watchify(b, options.watchifyOptions);
    b.on('update', bundle);
    b.on('log', options.onLog);
  }

  return bundle();

  function bundle() {
    return b.bundle()
      .on('error', options.onError)
      .pipe(source(options.outputFile))
      .pipe(gulpif(options.browserifyOptions.debug, sourcemapPipe()))
      .pipe(gulp.dest(options.outputPath));
  }
};
