var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    imagemin     = require('gulp-imagemin'),
    notify       = require('gulp-notify'),
    paths = {
      html: {
        all: './src/*.html',
        dest: './dist/'
      },
      sass: {
        main: './src/sass/style.scss',
        all: './src/sass/**/*.scss',
        dest: './dist/css/'
      },
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

gulp.task('bundlehtml', function () {
  return gulp.src(paths.html.all)
          .pipe(gulp.dest(paths.html.dest))
          .pipe(connect.reload());
});

/**
 * Images
 *
 * Look at src/images, optimize the images and send them to the appropriate place
*/
gulp.task('images', function() {

// Add the newer pipe to pass through newer images only
	return gulp.src(['./src/images/**/*.{png,jpg,gif}'])
				.pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
				.pipe(gulp.dest('./dist/img/'))
				.pipe( notify( { message: 'Images task complete', onLast: true } ) );
});

gulp.task('bundlesass', function() {
  return gulp.src(paths.sass.main)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({ouputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.sass.dest))
            .pipe(connect.reload());
});

gulp.task('bundlejs', function() {
    return gulp.src(paths.js.all)
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
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
  gulp.watch([paths.html.all], ['bundlehtml']);
  gulp.watch('./src/images/**/*', ['images']);
  gulp.watch([paths.js.all], ['bundlejs']);
  gulp.watch([paths.sass.all], ['bundlesass']);
});

gulp.task('default', ['connect', 'watch', 'images']);