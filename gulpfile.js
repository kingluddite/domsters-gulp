var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    paths = {
      js: {
        all: ['./src/js/global.js',
             './src/js/about.js',
             './src/js/contact.js',
             './src/js/index.js',
             './src/js/live.js',
             './src/js/photos.js'],
        dest: 'dist/js'

      }
    };

gulp.task('bundlejs', function() {
    gulp.src(paths.js.all)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.js.dest))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch([paths.js.all, './src/*.html'], ['bundlejs']);
});

gulp.task('default', ['connect', 'watch']);