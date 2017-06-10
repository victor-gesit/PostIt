import gulp from 'gulp';
import browSync from 'browser-sync';
import gulpSass from 'gulp-sass';

const browserSync = browSync.create();

// Setup browser-sync server
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './template/',
    }
  });
});

// Reload browser
gulp.task('reload', () => {
  browserSync.reload();
});

// Task to convert sass to css
gulp.task('sass', () => {
  console.log('Converting sass to css');
  gulp.src('template/scss/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(gulp.dest('template/css'));
});

// Watch sass and html files for changes, and run conversion task
gulp.task('sass:watch', ['browser-sync'], () => {
  gulp.watch(['template/scss/*.scss', 'template/*.html'], ['sass', 'reload']);
});
