'use strict';

var gulp = require('gulp');
var compilePipeline = require('./src/index.js');
var testPipeline = require('pipeline-test-node');
var validatePipeline = require('pipeline-validate-js');

var options = {
  plugins: {
    istanbul: {
      thresholds: {
        global: {
          branches: 70
        }
      }
    }
  }
};

var config = {
  jsFiles: [
    '*.js',
    'src/*.js',
    'test/*.js'
  ],

  lessFiles: [
    'test/fixtures/*.less'
  ],
  test: {
    jsFiles: [
      './*.js',
      'src/**/*.js',
      'test/*.js'
    ]
  }
};

gulp.task('compile:less', function() {
  return gulp
    .src(config.lessFiles)
    .pipe(compilePipeline.compileLESS());
});

gulp.task('build', ['compile:less'], function() {
  return gulp
    .src(config.test.jsFiles)
    .pipe(validatePipeline.validateJS())
    .pipe(testPipeline.test(options));
});