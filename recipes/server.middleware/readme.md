##BrowserSync - Server + Logging Middleware Example

### Installation/Usage:

- Clone this repo
- `npm install`
- `npm start`


This example adds the [connect-logger](https://www.npmjs.com/package/connect-logger) middleware

![Logger](http://f.cl.ly/items/3i2G451L3O3R182b3p14/Screen%20Shot%202015-02-18%20at%2016.02.59.png)

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

