var fs       = require('fs');
var crossbow = require('crossbow');
var path     = require('path');
var prefix   = "https://github.com/BrowserSync/recipes/tree/master/recipes";

var dirs = fs.readdirSync("./recipes")
    .map(function (item) {
        return {
            dir: item,
            name: item.split(".")
        };
    })
    .map(function (item) {
        item.pkg   = require("./recipes/"+item.dir+"/package.json");
        item.link  = [prefix, item.dir].join("/");
        item.title = item.name.map(function (item) {
            return item.charAt(0).toUpperCase() + item.slice(1);
        }).join(" ");
        return item;
    });

fs.writeFileSync("./manifest.json", JSON.stringify(dirs, null, 4));

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

dirs.forEach(function (item) {

    var key    = path.join("recipes", item.dir, "desc.md");
    var output = path.join("recipes", item.dir, "readme.md");

    var site = crossbow.builder({config: {cwd: "recipes/" + item.dir, markdown: false}});

    var page = site.add({
        key: key,
        content: fs.readFileSync(path.join("_src", "template.md"), "utf8")
    });

    site.freeze();

    site.compile({
        item: page,
        data: {
            example: item
        },
        cb: function (err, out) {
            if (err) {
                return site.logger.error(site.getErrorString(err));
            }
            fs.writeFileSync(output, out.get("compiled"));
        }
    });
});