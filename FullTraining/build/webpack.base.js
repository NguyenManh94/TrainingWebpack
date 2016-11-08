var path = require('path');
var root = path.resolve(__dirname, '../');
var webpack = require('webpack');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
// var webpack = require('webpack');
// var extractCSS = new ExtractTextPlugin('bundle.css');

module.exports = {
  entry: {
    /*must style with style ref (hello.css ref hello.js)*/
    "app": [
      `${root}/src/main.js`,
      `${root}/src/css/style.css`,
      `${root}/src/css/style-main.css`
    ],
    /*"vendor": [
     `${root}/node_modules/jquery/src/jquery.js`,
     "bootstrap"
     ]*/
  },
  output: {
    path: path.resolve(root, 'dist'), //set path default
    filename: '[name].min.js'
  },
  resolve: {
    extension: ['', '.js', '.css', '.es6']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        // loader: extractCSS.extract(["css"])
        exclude: /(node_module|bower_components)/,
        loaders: ['style', 'css?sourceMap'
          , 'resolve-url', 'postcss']
      },
      {
        test: /\.js$/,
        exclude: /(node_module| bower_components)/,
        loader: 'babel',
        include: root
      }
    ]
  },
  devtool: null,
  watch: null,
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('vendor.min', 'vendor.min.js', Infinity),
    /*Tao 1 banner chung*/
    new webpack.BannerPlugin("author: dev-easy manhnguyen"),
    /*Defind 1 plugin cho he thong*/
    /*new webpack.ProvidePlugin({
     _: 'lodash'
     })*/
  ]
};