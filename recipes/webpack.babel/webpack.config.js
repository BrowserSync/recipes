// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')
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
      new webpack.ProvidePlugin({
        $: 'jquery'
        ,jQuery: 'jquery'
        ,'window.jQuery':'jquery'
      }),
      new webpack.LoaderOptionsPlugin({
        debug: false
      })
      ,new webpack.NoEmitOnErrorsPlugin()
      ,new HtmlWebpackPlugin({
        hash:true
        ,template: 'src/index.pug'
        ,favicon:"images/favicon.ico"
      })
      // ,new FaviconsWebpackPlugin({
      //   logo: './images/screen_icon-144.png',
      //   prefix: 'icons-[hash]/',
      //   title: '美加美·健身·PC',
      //   icons: {
      //     android: true,
      //     appleIcon: true,
      //     appleStartup: true,
      //     favicons: false
      //   }
      // })
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
            ,{
                test: /\.pug?$/,
                use: [
                  {
                    loader: 'pug-loader',
                    query: {pretty: true}
                  }
                ]
            }
            ,{
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            }
            ,{
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            }
            ,{
              test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
              loader: "file-loader"
            }
            ,{
              test: /\.(png|jpg|gif)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8192
                    ,prefix:"name=images/[hash:8].[name].[ext]"
                  }
                }
              ]
            }
        ]
    }

};
