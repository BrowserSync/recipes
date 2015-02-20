{{#data src="package.json" as="pkg"}}
##BrowserSync - {{pkg.description}}

### Installation/Usage:

This repo contains many examples, but to try out *just* this one, follow these instructions: 

- Clone the entire repo `git clone https://github.com/BrowserSync/recipes.git bs-recipes`
- Move into the directory containing this example `cd bs-recipes/{{page.path.dir}}`
- `npm install`
- `npm start`
{{inc src="desc.md"}}

{{#if pkg.main}}
```js
{{inc src=pkg.main}}
```
{{/if}}
{{/data}}

