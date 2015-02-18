### BrowserSync Server Recipe

### Installation/Usage:

- Clone this repo
- `npm install`
- `npm start`
- Perform changes to either `index.html` or `css/main.css`

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