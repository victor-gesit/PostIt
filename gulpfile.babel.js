import gulp from 'gulp';
import jasmineNode from 'gulp-jasmine-node';
import babel from 'gulp-babel';
import injectModules from 'gulp-inject-modules';
import gulpBabelIstanbul from 'gulp-babel-istanbul';
import gulpCoveralls from 'gulp-coveralls';


// This task runs jasmine tests and outputs the result to the cli.
gulp.task('run-tests', () => {
  gulp.src('server/tests/tests.js')
    .pipe(babel())
    .pipe(injectModules())
    .pipe(jasmineNode());
});
// Gulp coverage implicitly depends on run-tests.
gulp.task('coverage', () => {
  gulp.src(['server/**/*.js'])
    .pipe(gulpBabelIstanbul())
    .pipe(gulpBabelIstanbul.hookRequire())
    .on('finish', () => {
      gulp.src('server/tests/tests.js')
      .pipe(babel())
      .pipe(injectModules())
      .pipe(jasmineNode())
      .pipe(gulpBabelIstanbul.writeReports())
      .pipe(gulpBabelIstanbul.enforceThresholds({ thresholds: { global: 50 } }))
      .on('end', () => {
        gulp.src('coverage/lcov.info')
        .pipe(gulpCoveralls());
      });
    });
});
