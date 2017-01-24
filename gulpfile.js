var gulp = require('gulp'),
    connect = require('gulp-connect'),
    paths = {
      js: {
        all: ['./src/js/global.js',
             './src/js/about.js',
             './src/js/contact.js',
             './src/js/index.js',
             './src/js/live.js',
             './src/js/photos.js']
      }
    };

gulp.task('connect', function() {
  connect.server();
});

gulp.task('default', ['connect']);