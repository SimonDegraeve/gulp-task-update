'use strict';

var gulp = require('gulp');

require('./index')();
require('gulp-task-lint')('./lib/**/*.js', {shouldFail: true});

gulp.task('default', ['lint']);
