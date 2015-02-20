{{#data src="package.json" as="pkg"}}
##BrowserSync - {{pkg.description}}

### Installation/Usage:

- Clone this repo
- `npm install`
- `npm start`
{{inc src="desc.md"}}

{{#if pkg.main}}
```js
{{inc src=pkg.main}}
```
{{/if}}
{{/data}}

