var gulp         = require('gulp');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var sixtofiveify = require('6to5ify');
var reactify     = require('reactify');
var watchify     = require('watchify');
var browserify   = require('browserify');
var browserSync  = require('browser-sync');

// Input file.
var bundler     = watchify(browserify('./app/js/app.jsx', watchify.args));

// React JSX transform
bundler.transform(reactify);

// Babel, 6to5ify transform
bundler.transform(sixtofiveify);

// On updates recompile
bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/js/dist'))
        .pipe(browserSync.reload({stream: true, once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
    return bundle();
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle'], function () {
    browserSync({
        server: "./app"
    });
});