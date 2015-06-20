#Browsersync - Browserify, Babel (6to5) &amp; React example

## Installation/Usage:

To try this example, follow these 4 simple steps. 

**Step 1**: Clone this entire repo
```bash
$ git clone https://github.com/Browsersync/recipes.git bs-recipes
```

**Step 2**: Move into the directory containing this example
```bash
$ cd bs-recipes/recipes/gulp.browserify
```

**Step 3**: Install dependencies
```bash
$ npm install
```

**Step 4**: Run the example
```bash
$ npm start
```

### Additional Info:



This one is a beast. Write your React JSX code, in ES6, compiled by Browserify and auto-reload all devices
when the compilation is complete.

### Preview of `gulpfile.js`:
```js
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var reactify    = require('reactify');
var watchify    = require('watchify');
var browserify  = require('browserify');
var browserSync = require('browser-sync');

// Input file.
var bundler     = watchify(browserify('./app/js/app.jsx', watchify.args));

// React JSX transform
bundler.transform(reactify);

// Babel transform
bundler.transform(babelify);

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
```

