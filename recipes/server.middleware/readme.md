##Browser Sync - Server Middleware Example

### Installation/Usage:

- Clone this repo
- `npm install`
- `npm start`


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
    files: ["app/*.html", "app/css/*.css"]
});
```

