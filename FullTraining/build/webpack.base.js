var path = require('path');
var root = path.resolve(__dirname, '../');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
// var webpack = require('webpack');
// var extractCSS = new ExtractTextPlugin('bundle.css');

module.exports = {
  entry: {
    app: ['./src/main.css', './src/main.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].min.js',
    // publicPath: '/dist/'
  },
  resolve: {
    extension: ['', '.js', '.css']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /(node_module|bower_component)/,
        loader: 'eslint-loader',
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        // loader: extractCSS.extract(["css"])
        loaders: ['style', 'css', 'resolve-url', 'postcss']
      },
      {
        test: /\.js$/,
        exclude: /(node_module| bower_components)/,
        loader: 'babel',
        include: root
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000000,
          name: '[name]-[hash:7].[ext]'
        }
      }
    ]
  },
  devtool: null,
  watch: null,
  plugins: [
    // extractCSS,
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   compress: {
    //     warnings: false
    //   },
    // })
  ],
  eslint: {
    configFile: path.resolve(root, './.eslintrc')
  }
};