##BrowserSync - Gulp &amp; SASS

### Installation/Usage:

This repo contains many examples, but to try out *just* this one, follow these instructions: 

- Clone the entire repo `git clone https://github.com/BrowserSync/recipes.git bs-recipes`
- Move into the directory containing this example `cd bs-recipes/recipes/gulp.sass`
- `npm install`
- `npm start`

### Additional Info:



### Preview of `gulpfile.js`:
```js
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

var src = {
    scss: 'app/scss/*.scss',
    css:  'app/css',
    html: 'app/*.html'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function(done) {
    browserSync({
        server: "./app"
    }, done);

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);

```

