'use strict';

var compilePipeline = require('../src/index.js');
var clean = require('gulp-clean');
var gulp = require('gulp');
var path = require('path');
var expectFile = require('gulp-expect-file');

var altOutputPath = 'tmp';

function getFixtures (glob) {
  return path.join(__dirname, 'fixtures', glob);
}

beforeEach(function() {
  clean({force: true});
});

describe('pipeline-compile-less', function() {

  it('Should output one file after concatenation', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileLESS({
        autoprefix: false,
        addSourceMaps: false
      }))
      .pipe(expectFile(['dest/pipeline-compile-less.css']));
    done();
  });

  it('Should output the concatenated file and the map', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileLESS({
        addSourceMaps: true
      }))
      .pipe(expectFile(['dest/pipeline-compile-less.css', 'dest/pipeline-compile-less.css.map']));
    done();
  });

});

describe('default options', function() {

  it('Should output two files to default directory', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileLESS())
      .pipe(expectFile(['dest/pipeline-compile-less.css', 'dest/pipeline-compile-less.css.map']));
    done();
  });

});

describe('autoprefixer default options', function() {

  it('Should call the gulp-less function', function (done) {

    // TODO lazypipe is not allowing the gulp-less function to be tested, devise method to expose this for testing - .pipe(expectFile(lessSpy).to.have.been.called())
    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileLESS({
        autoprefix: true
      }));
    done();
  });

});

describe('output to a specified directory', function() {

  it('Should two files directory', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileLESS({
        outputDirectory: altOutputPath,
        output: altOutputPath
      }))
      .pipe(expectFile(['tmp/pipeline-compile-less.css.map', 'tmp/pipeline-compile-less.css']));
    done();
  });

});

describe('output to another filename', function() {

  it('Should two files directory with specified filename', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileLESS({
        outputFileName: 'test-filename.css',
        outputDirectory: altOutputPath,
        output: altOutputPath
      }))
      .pipe(expectFile(['tmp/test-filename.css.map', 'tmp/test-filename.css']));
    done();
  });

});

describe('concatenation set to false', function() {

  afterEach(function() {
    clean({force: true});
  });

  it('Should output two files to default directory', function (done) {

    gulp.src(getFixtures('*'))
      .pipe(compilePipeline.compileLESS({
        autoprefix: false,
        addSourceMaps: false,
        concatCSS: false
      }))
      .pipe(expectFile(['test/fixtures/test-less1.css', 'test/fixtures/test-less2.css']));
    done();
  });

});