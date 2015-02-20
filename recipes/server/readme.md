##BrowserSync - Server example

### Installation/Usage:

This repo contains many examples, but to try out *just* this one, follow these instructions: 

- Clone the entire repo `git clone https://github.com/BrowserSync/recipes.git bs-recipes`
- Move into the directory containing this example `cd bs-recipes/recipes/server`
- `npm install`
- `npm start`
- Perform changes to either `index.html` or `css/main.css`

Preview of **app.js**
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

