var path = require('path');
var root = path.resolve(__dirname);
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
// var webpack = require('webpack');
// var extractCSS = new ExtractTextPlugin('bundle.css');

module.exports = {
  entry: {
    app: ['./src/main.css', './src/main.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extension: ['', '.js', '.css']
  },
  devServer: {
    progress: true,
    port: 82  //default: 8080
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_module| bower_components)/,
        loader: 'babel',
        include: root
      },
      {
        test: /\.css$/,
        // loader: extractCSS.extract(["css"])
        loaders: ['style', 'css']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name]-[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    // extractCSS,
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   compress: {
    //     warnings: false
    //   },
    // })
  ]
};