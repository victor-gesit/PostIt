import gulp from 'gulp';
import browSync from 'browser-sync';

const browserSync = browSync.create();
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './template/',
    }
  });
});

gulp.task('reload', ['browser-sync'], () => {
  gulp.watch(['template/*.html', 'template/css/*.css'], () => {
    browserSync.reload();
  });
});
