var gulp = require('gulp');
// var clean = require('gulp-clean');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.'));
});

gulp.task('build', ['sass']);