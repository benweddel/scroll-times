var gulp = require('gulp'); //npm install gulp --save-dev
var sass = require('gulp-sass'); // npm install gulp-sass --save-dev

gulp.task('sass', function () {
  gulp.src('css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});
 
gulp.task('watch', function () {
  gulp.watch('css/*.scss', ['sass']);
});

gulp.task('default', ['sass','watch']);