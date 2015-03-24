/**
 * Require BrowserSync
 */
var browserSync = require('browser-sync');

/**
 * Run BrowserSync with server config
 */
browserSync({
    server: "app",
    files: ["app/*.html", "app/css/*.css"],
    middleware: require("connect-gzip-static")("./app")
});