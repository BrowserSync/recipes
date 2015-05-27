{{#data src="package.json" as="pkg"}}
#Browsersync - {{pkg.description}}

## Installation/Usage:

To try this example, follow these 4 simple steps. 

**Step 1**: Clone this entire repo
```bash
$ git clone https://github.com/Browsersync/recipes.git bs-recipes
```

**Step 2**: Move into the directory containing this example
```bash
$ cd bs-recipes/{{page.path.dir}}
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

{{inc src="desc.md"}}

{{#if pkg.main}}
### Preview of `{{pkg.main}}`:
```js
{{inc src=pkg.main}}
```
{{/if}}
{{/data}}

