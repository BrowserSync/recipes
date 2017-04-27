// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: '#eval-source-map',

    entry: ['./src/main'],

    output: {
        path: path.join(__dirname, 'app'),
        publicPath: '/',
        filename: 'dist/bundle.js'
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                // Only run `.js` and `.jsx` files through Babel
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                // Options to configure babel with
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    }

};
