var gulp = require('gulp'); //npm install gulp --save-dev
var sass = require('gulp-sass'); // npm install gulp-sass --save-dev
var livereload = require('gulp-livereload');

gulp.task('sass', function () {
  gulp.src('css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});
 
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('css/*.scss', ['sass']);
});

gulp.task('default', ['sass','watch']);