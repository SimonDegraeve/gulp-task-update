'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;

module.exports = function(taskName) {
  taskName = taskName || 'update';

  gulp.task(taskName + ':check', function(done) {
    exec('./node_modules/npm-check-updates/bin/npm-check-updates',
      function(error, stdout, stderr) {
        if (stdout.indexOf('All dependencies match the latest package versions :)') === -1) {
          error = new Error('Dependencies can be updated.');
          console.log(stdout);
        }
        done(error);
      }
    );
  });

  gulp.task(taskName + ':apply', function(done) {
    exec('./node_modules/npm-check-updates/bin/npm-check-updates -u',
      function(error, stdout, stderr) {
        if (stdout.indexOf('All dependencies match the latest package versions :)') !== -1) {
          return done(error);
        }
        if (stdout.indexOf('package.json upgraded') === -1) {
          error = new Error('Fail upgrading dependencies.');
          console.log(stdout);
        }
        done(error);
      }
    );
  });
};
