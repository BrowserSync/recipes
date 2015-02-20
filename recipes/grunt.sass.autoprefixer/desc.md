
This example shows how you can chain potentially slow-running tasks, but still achieve CSS
Injection. The trick, as seen below, is to NOT watch the CSS files at all, but instead trigger
the `browserSync.reload` method at exactly the correct time.

That's why we configure the watch task like this:

```js
watch: {
    options: {
        spawn: false // Important, don't remove this!
    },
    files: 'app/**/*.scss',
    tasks: ['sass', 'autoprefixer', 'bs-inject']
},
```

... because we are not watching the out CSS files, we can chain as many tasks together as we need, 
and everything will just work perfectly!
