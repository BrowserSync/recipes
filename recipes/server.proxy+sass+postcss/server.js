require('es6-promise').polyfill();

const bsProxy = require('browser-sync').create('My proxy server');
const bsServer = require('browser-sync').create('My server');

const postcss = require('postcss');
const prefixer = require('autoprefixer');
const cssnano = require('cssnano');
const unprefixer = require('postcss-unprefix');
const sass = require('node-sass');
const term = require('terminal-kit').terminal;
const fs = require('fs');

const style = {
    in: 'app/scss/app.scss',
    out: 'app/css/app.css'
};

const bsServerConfig = {
    server: 'app',
    port: 3005,
    ui: false,
    online: false,
    open: false
};

const bsProxyConfig = {
    watchOptions: {
        awaitWriteFinish: {
            stabilityThreshold: 700,
            pollInterval: 100
        }
    },
    proxy: 'localhost:3005',
    port: 3004,
    injectChanges: true,
    online: false,
    ui: false,
    open: 'local',
    logLevel: 'debug',
    reloadOnRestart: false,
    ghostMode: false,
    files: ['app/css/*.css', 'app/*.html']
};

var sassConfig = {
    file: style.in
};

var post = {
    autoprefixer: {
        browsers: '>5%'
    },
    cssnano: {
        calc: true,
        colormin: true,
        discardComments: {
            removeAll: true
        },
        discardEmpty: true,
        discardDuplicates: true,
        discardOverridden: true,
        normalizeCharset: true,
        mergeLonghand: true,
        mergeRules: true,
        minifyFontValues: true,
        minifyParams: true,
        orderedValues: true,
        uniqueSelectors: true,
        safe: true
    }
};

bsProxy.emitter.on('init', function() {
    buildCSS();
});

bsServer.emitter.on('init', function() {
    term.red('Server initiated.\n');
    startProxy();
});

bsProxy.watch(['app/scss/*.scss']).on('change', function() {
    term('[').red('BS')('] ')(style.in + ' changed.\n');
    buildCSS();
});

function startProxy() {
    bsProxy.init(bsProxyConfig, function() {
        term('[').red('BS')('] ')('Proxy server initiated.\n');
    });
}

bsServer.init(bsServerConfig, function() {
    term('[').red('BS')('] ')('Server initiated.\n');
});

function buildCSS() {
    sass.render(sassConfig, function(err, result) {
        //
        if (!err) {
            postcss([unprefixer, prefixer(post.autoprefixer), cssnano(post.cssnano)])
                .process(result.css.toString())
                .then(function(result) {
                    fs.writeFileSync(style.out, result.css);
                });
        } else {
            term('[').red('BS')('] ')(err.message + '\n');
        }
    });
}
