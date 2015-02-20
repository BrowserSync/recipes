#BrowserSync - Gulp &amp; Ruby SASS

## Installation/Usage:

To try this example, follow these 4 simple steps. 

**Step 1**: Clone this entire repo
```bash
$ git clone https://github.com/BrowserSync/recipes.git bs-recipes
```

**Step 2**: Move into the directory containing this example
```bash
$ cd bs-recipes/recipes/gulp.ruby.sass
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



This example highlights both the stream support for injecting CSS, aswell
as the support for calling `reload` directly following html changes. 

We also need to filter out any source maps created by ruby-sass.

### Preview of `gulpfile.js`:
```js
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var filter      = require('gulp-filter');
var sass        = require('gulp-ruby-sass');
var reload      = browserSync.reload;

var src = {
    scss: 'app/scss/*.scss',
    css:  'app/css',
    html: 'app/*.html'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync({
        server: "./app"
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return sass('app/scss')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
```

