#Browsersync - Server with pre-gzipped assets example

## Installation/Usage:

To try this example, follow these 4 simple steps. 

**Step 1**: Clone this entire repo
```bash
$ git clone https://github.com/Browsersync/recipes.git bs-recipes
```

**Step 2**: Move into the directory containing this example
```bash
$ cd bs-recipes/recipes/server.gzipped.assets
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



This example shows how you can use the `connect-gzip-static` middleware 
to serve already-gzipped assets.

### Preview of `app.js`:
```js
/**
 * Require Browsersync
 */
var browserSync = require('browser-sync');

/**
 * Run Browsersync with server config
 */
browserSync({
    server: "app",
    files: ["app/*.html", "app/css/*.css"],
    middleware: require("connect-gzip-static")("./app")
});
```

