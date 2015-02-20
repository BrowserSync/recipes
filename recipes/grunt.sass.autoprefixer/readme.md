##BrowserSync - Grunt, SASS &amp; Autoprefixer

### Installation/Usage:

To try this example, follow these 4 simple steps. 

**Step 1** Clone this entire repo
```bash
git clone https://github.com/BrowserSync/recipes.git bs-recipes
```

**Step 2** Move into the directory containing this example
```bash
cd bs-recipes/recipes/grunt.sass.autoprefixer
```

**Step 3** Install dependencies
```bash
npm install
```

**Step 4** Run the example
```bash
npm start
```

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


### Preview of `Gruntfile.js`:
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

