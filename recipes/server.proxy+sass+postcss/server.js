/* jshint node:true,esversion:6 */
"use strict";
///
require('es6-promise').polyfill();
const bsProxy = require("browser-sync").create("My proxy server");
const bsServer = require("browser-sync").create("My server");

var postcss = require('postcss'),
    prefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    unprefixer = require('postcss-unprefix'),
    sass = require("node-sass"),
    term = require( 'terminal-kit' ).terminal,
    fs = require("fs")
;
//
//
//
var style = {
    "in": "app/scss/app.scss",
    "out": "app/css/app.css"
};
//
var bsServerConfig = {
    server:"app",
    port:3005,
    ui:false,
    online:false,
    open:false
};
//
var bsProxyConfig = {
    //chokidar options
    watchOptions: {
	awaitWriteFinish: {
	    stabilityThreshold: 700,
	    pollInterval: 100
	}
    },
    proxy: "localhost:3005",
    port:3004,
    injectChanges: true,
    online:false,
    ui:false,
    open: "local",
    logLevel: "debug",
    reloadOnRestart: false,
    ghostMode: false,
    files: ["app/css/*.css",
	    "app/*.html"]
};
//
var sassConfig = {
    file: style.in
};
//
var post = {
    "autoprefixer": {
	"browsers": ">5%"
    },
    "cssnano": {
	"calc":true,
	"colormin":true,
	"discardComments": {
	    "removeAll": true
	},
	"discardEmpty": true,
	"discardDuplicates":true,
	"discardOverridden":true,
	"normalizeCharset": true,
	"mergeLonghand": true,
	"mergeRules":true,
	"minifyFontValues":true,
	"minifyParams":true,
	"orderedValues":true,
	"uniqueSelectors":true,
	"safe":true
    }
};
//
//
// //
// Listen for the `init` event
bsProxy.emitter
    .on("init", function () {
	buildCSS();
    });
//
bsServer.emitter
    .on("init", function () {
	term.red("Server initiated.\n");
	startProxy();
    });
//
bsProxy.watch( [
    "app/scss/*.scss"
])
    .on("change", function () {
	term("[").red("BS")("] ")(style.in + " changed.\n");
	buildCSS();
    });
//
function startProxy () {
    bsProxy.init(bsProxyConfig,
		 function () {
		     term("[").red("BS")("] ")("Proxy server initiated.\n");
		 });
}
////
bsServer.init(bsServerConfig, function () {
    term("[").red("BS")("] ")("Server initiated.\n");
});
//
//
function buildCSS() {
    sass.render(sassConfig, function(err,result) {
	//
	if(!err){
	    postcss([
		unprefixer,
		prefixer(post.autoprefixer),
		cssnano(post.cssnano)
	    ])
		.process(result.css.toString())
		.then(function (result) {

		    fs.writeFileSync(style.out,result.css);
		});
	} else {
	    term("[").red("BS")("] ")(err.message+"\n");
	}
    });
}
