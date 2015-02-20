##BrowserSync - Grunt, SASS &amp; Autoprefixer

### Installation/Usage:

This repo contains many examples, but to try out *just* this one, follow these instructions: 

- Clone the entire repo `git clone https://github.com/BrowserSync/recipes.git bs-recipes`
- Move into the directory containing this example `cd bs-recipes/recipes/grunt.sass.autoprefixer`
- `npm install`
- `npm start`

### Additional Info:



This example shows how you can chain potentially slow-running tasks, but still achieve CSS
Injection. The trick, as seen below, is to NOT watch the CSS files at all, but instead trigger
the `browserSync.reload` method at exactly the correct time.

That's why we configure the watch task like this:

```js
watch: {
    options: {
        spawn: false // Important, don't remove this!
    },
    files: 'app/**/*.scss',
    tasks: ['sass', 'autoprefixer', 'bs-inject']
},
```

... because we are not watching the out CSS files, we can chain as many tasks together as we need, 
and everything will just work perfectly!


### Preview of **Gruntfile.js**:
```js
var browserSync = require('browser-sync');

module.exports = function (grunt) {
    grunt.initConfig({
        dirs: {
            css:  "app/css",
            scss: "app/scss"
        },
        watch: {
            options: {
                spawn: false
            },
            files: '<%= dirs.scss %>/**/*.scss',
            tasks: ['sass', 'autoprefixer', 'bs-inject']
        },
        sass: {
            dev: {
                files: {
                    '<%= dirs.css %>/main.css': '<%= dirs.scss %>/main.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 5 versions', 'ie 8']
            },
            css: {
                src: '<%= dirs.css %>/main.css',
                dest: '<%= dirs.css %>/main.css'
            }
        }
    });

    grunt.registerTask('bs-init', function () {
        browserSync({
            server: "./app"
        })
    });

    grunt.registerTask('bs-inject', function () {
        browserSync.reload('main.css');
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // define default task
    grunt.registerTask('default', ['bs-init', 'watch']);
};
```

