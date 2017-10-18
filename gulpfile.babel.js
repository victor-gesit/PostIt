import gulp from 'gulp';
import jasmineNode from 'gulp-jasmine-node';
import babel from 'gulp-babel';
import injectModules from 'gulp-inject-modules';
import gulpBabelIstanbul from 'gulp-babel-istanbul';
import gulpCoveralls from 'gulp-coveralls';
import dotenv from 'dotenv';
import models from './server/models';

dotenv.config();
process.env.NODE_ENV = 'test';


// This task runs jasmine tests and outputs the result to the cli.
gulp.task('run-tests', () => {
  gulp.src('server/tests/*.js')
    .pipe(babel())
    .pipe(injectModules())
    .pipe(jasmineNode())
    .on('end', () => {
      models.sequelize.close();
    });
});
// Gulp coverage implicitly depends on run-tests.
gulp.task('coverage', () => {
  gulp.src(['server/**/*.js', '!server/tests/*.js', '!server/auth/passport.js', '!server/models/index.js'])
    .pipe(gulpBabelIstanbul())
    .pipe(gulpBabelIstanbul.hookRequire())
    .on('finish', () => {
      gulp.src('server/tests/*.js')
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
