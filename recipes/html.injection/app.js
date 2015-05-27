/**
 * Require BrowserSync
 */
var bs = require('browser-sync').create();

/**
 * Run BrowserSync with server config
 */
bs.init({
    server: "app",
    files: ["app/css/*.css"],
    plugins: [
        {
            module: "bs-html-injector",
            options: {
                files: ["app/*.html"]
            }
        }
    ]
});