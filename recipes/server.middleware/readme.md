##BrowserSync - Server + Logging Middleware Example

### Installation/Usage:

This repo contains many examples, but to try out *just* this one, follow these instructions: 

- Clone the entire repo `git clone https://github.com/BrowserSync/recipes.git bs-recipes`
- Move into the directory containing this example `cd bs-recipes/recipes/server.middleware`
- `npm install`
- `npm start`

### Additional Info:



This example adds the [connect-logger](https://www.npmjs.com/package/connect-logger) middleware

![Logger](http://f.cl.ly/items/3i2G451L3O3R182b3p14/Screen%20Shot%202015-02-18%20at%2016.02.59.png)

### Preview of **app.js**:
```js
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
    middleware: require("connect-logger")()
});
```

