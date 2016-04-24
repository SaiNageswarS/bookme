var gulp = require('gulp'),
  gulpWatch = require('gulp-watch'),
  del = require('del'),
  argv = process.argv;


gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);
gulp.task('build:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);


var buildBrowserify = require('./build/browserify-typescript');
var buildSass = require('./build/sass-build');
var copyHTML = require('./build/copy-html');
//var copyFonts = require('build/copy-fonts');
var copyScripts = require('./build/copy-scripts');

gulp.task('watch', ['sass', 'html', 'scripts'], function(){
  gulpWatch('src/**/*.scss', function(){ gulp.start('sass'); });
  gulpWatch('src/**/*.html', function(){ gulp.start('html'); });
  return buildBrowserify({ watch: true });
});

gulp.task('build', ['sass', 'html', 'scripts'], buildBrowserify);
gulp.task('sass', buildSass);
gulp.task('html', copyHTML);
//gulp.task('fonts', copyFonts);
gulp.task('scripts', copyScripts);
gulp.task('clean', function(done){
  del('public/build', done);
});
