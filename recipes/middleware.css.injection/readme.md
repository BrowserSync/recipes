##BrowserSync - Middleware + CSS example

### Installation/Usage:

This repo contains many examples, but to try out *just* this one, follow these instructions: 

- Clone the entire repo `git clone https://github.com/BrowserSync/recipes.git bs-recipes`
- Move into the directory containing this example `cd bs-recipes/recipes/middleware.css.injection`
- `npm install`
- `npm start`
- Perform changes to `app/css/main.less` to see live css injection

Preview of **app.js**
```js
/**
 * Require BrowserSync
 */
var browserSync = require("browser-sync");

/**
 * Run the middleware on files that contain .less
 */
function lessMiddleware (req, res, next) {
    var parsed = require("url").parse(req.url);
    if (parsed.pathname.match(/\.less$/)) {
        return less(parsed.pathname).then(function (o) {
            res.setHeader('Content-Type', 'text/css');
            res.end(o.css);
        });
    }
    next();
}

/**
 * Compile less
 */
function less(src) {
    var f = require('fs').readFileSync('app' + src).toString();
    return require('less').render(f);
}

/**
 * Run BrowserSync with less middleware
 */
browserSync({
    files: "app/css/*.less",
    server: "app",
    injectFileTypes: ["less"],
    /**
     * Catch all requests, if any are for .less files, recompile on the fly and
     * send back a CSS response
     */
    middleware: lessMiddleware
});

```

