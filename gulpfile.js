const gulp = require('gulp');
const sass = require('gulp-sass');

const pre_path = './src';

const scss = {
  source: pre_path + '/scss/**/*',
  theme: pre_path + '/scss/theme.scss',
  distribution: pre_path + '/css'
}

gulp.task('copy-scss', function () {
  return gulp.src(scss.theme)
  .pipe(sass())
  .pipe(gulp.dest(scss.distribution))
});

gulp.task('watch-scss', function () {
  gulp.watch(scss.source, gulp.series('copy-scss'));
});