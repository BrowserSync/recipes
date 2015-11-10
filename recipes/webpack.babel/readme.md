#Browsersync - Webpack + Babel

## Installation/Usage:

To try this example, follow these 4 simple steps. 

**Step 1**: Clone this entire repo
```bash
$ git clone https://github.com/Browsersync/recipes.git bs-recipes
```

**Step 2**: Move into the directory containing this example
```bash
$ cd bs-recipes/recipes/webpack.babel
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

Edit any files within SRC


### Preview of `app.js`:
```js
/**
 * Require Browsersync along with webpack and middleware for it
 */
var browserSync          = require('browser-sync').create();
var webpack              = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var stripAnsi = require('strip-ansi');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('./webpack.config');
var bundler       = webpack(webpackConfig);

/**
 * Reload all devices when bundle is complete
 */
bundler.plugin('done', function (stats) {
    if (stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
            title: "Webpack Error:",
            body:  stripAnsi(stats.toString()),
            timeout: 100000
        });
    }
    browserSync.reload();
});

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync.init({
    server: 'app',
    open: false,
    logFileChanges: false,
    middleware: [
        webpackDevMiddleware(bundler, {
            // IMPORTANT: dev middleware can't access config, so we should
            // provide publicPath by ourselves
            publicPath: webpackConfig.output.publicPath,

            // pretty colored output
            stats: {
                colors: true
            }

            // for other settings see
            // http://webpack.github.io/docs/webpack-dev-middleware.html
        })
    ],
    plugins: ['bs-fullscreen-message'],
    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
        'app/css/*.css',
        'app/*.html'
    ]
});

```

