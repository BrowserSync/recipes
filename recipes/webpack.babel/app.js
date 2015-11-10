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
