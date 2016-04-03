var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var watchify    = require('watchify');
var exorcist    = require('exorcist');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var glob        = require('glob');
var path        = require('path');
var mkdirp      = require('mkdirp');
var mergeStream = require('merge-stream');
var through     = require('through2');

var mkdir = function (dir, opts) {
    return through.obj(function (file, enc, cb) {
        mkdirp(dir, opts, function (err, made) {
            if (err) {
                cb(new gutil.PluginError('gulp-mkdirp', err), file);
                return;
            }
            cb(null, file);
        });
    });
};

/**
 * Creating multiple bundles with watchify
 */
gulp.task('bundle', function (done) {
    glob('./app/js/{app.js,worker/worker.js}', function (err, files) {
        if (err) {
            done(err);
            return;
        }

        var tasks = files.map(function (entry) {
            var relative = path.relative('./app/js', entry);
            var sourceMapPath = './app/js/dist/' + relative + '.map';

            // Input file.
            watchify.args.debug = true;
            var bundler = watchify(browserify(entry, watchify.args));

            // Babel transform
            bundler.transform(babelify.configure({
                sourceMapRelative: 'app/js'
            }));

            var bundle = function () {
                gutil.log('Compiling ' + entry + '...');

                return bundler.bundle()
                    .on('error', function (err) {
                        gutil.log(err.message);
                        browserSync.notify('Browserify Error!');
                        this.emit('end');
                    })
                    // The mkdir() below is a workaround for an exorcist issue,
                    // where exorcist fails silently when the output dir does not exist
                    // see https://github.com/thlorenz/exorcist/issues/18
                    // and https://github.com/thlorenz/exorcist/pull/19
                    .pipe(mkdir(path.dirname(sourceMapPath)))
                    .pipe(exorcist(sourceMapPath))
                    .pipe(source(relative))
                    .pipe(gulp.dest('./app/js/dist'))
                    .pipe(browserSync.stream({once: true}));
            }

            // On updates recompile
            bundler.on('update', bundle);

            return bundle();
        });

        // The resume() below fixes an issue in orchestrator,
        // where the merged stream does not trigger end event
        // see https://github.com/grncdr/merge-stream/issues/6
        // and https://github.com/orchestrator/orchestrator/issues/48
        mergeStream(tasks).resume().on('end', done);
    });
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle'], function () {
    browserSync.init({
        server: './app'
    });
});
