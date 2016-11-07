var config = require('./webpack.base');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('css/[name].min.css');
var autoprefixer = require('autoprefixer'); //tu dong fix css voi cac trinh duyet
var _ = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var root = path.resolve(__dirname, '../');

/*
 config.plugins = config.plugins.concat([
 new webpack.HotModuleReplacementPlugin(),
 //su dung qua may ao hrm
 // new webpack.NoErrorsPlugin()
 ]);
 */
//add entry new
var new_entry = {
  "publicJS/ex1": path.resolve(root, 'src/publicJS/ex1.js'),
  "publicJS/ex2": path.resolve(root, 'src/publicJS/ex2.js'),
  "app-home": path.resolve(root, 'src/app-home')
};
_.merge(config.entry, new_entry); //use lodash add object

//add loaders support
config.module.loaders = config.module.loaders.concat([
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader?name=[path]-[name].[ext]"
  },
  {
    test: /\.(png|jpg)$/,
    loader: "file-loader?name=[name].[ext]"
  }
]);

//add plugin support with env: production, su dung concat
config.plugins = config.plugins.concat([
  extractCSS,
  /*Co the tao nhieu common chunk plugin*/
  new webpack.optimize.CommonsChunkPlugin({
    name: "publicJS/ex-common",
    chunks: ["publicJS/ex2", "publicJS/ex1"]
  }),
  /*Tao 1 banner chung*/
  new webpack.BannerPlugin("Author: ManhNV11 -MasterJs"),
  new HtmlWebpackPlugin({
    template: path.resolve(root, 'src/index.html'),
    hash: true,
    cache: true,
    showErrors: false, //neu co loi sẽ ghi vào file html
    minify: false,
    filename: 'index.html',
    favicon: 'src/favicon.ico',
    chunks: ['app', 'publicJS/ex-common', 'publicJS/ex2', 'publicJS/ex1', 'app-home'],
    chunksSortMode: function (a, b) {
      return (a.names[0] > b.names[0]) ? 1 : -1;
    },
    inject: 'body' //value: head =>header, true => lan lon ca 2
  })
]);

var cssLoaders = config.module.loaders[0].loaders;
config.module.loaders[0].loaders = null;
config.module.loaders[0].loader = extractCSS.extract(cssLoaders.slice(1, 3));

module.exports = config;