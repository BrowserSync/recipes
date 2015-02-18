var fs       = require('fs');
var crossbow = require('crossbow');

var dirs = fs.readdirSync("./recipes")
    .map(function (item) {
        return {
            dir: item,
            name: item.split(".")
        };
    })
    .map(function (item) {
        item.title = item.name.map(function (item) {
            return item.charAt(0).toUpperCase() + item.slice(1);
        }).join(" ");
        return item;
    });

var site = crossbow.builder({
    config: {
        markdown: false
    },
    data: {
        config: "file:config.yml",
        recipes: dirs
    }
});

var readme = site.add({
    type: "page",
    key: "_src/readme.md",
    content: fs.readFileSync("_src/readme.md", "utf8")
});

site.freeze();

site.compile({
    item: readme,
    cb: function (err, out) {
        if (err) {
            return site.logger.error(site.getErrorString(err));
        }
        fs.writeFileSync("readme.md", out.get("compiled"));
    }
});