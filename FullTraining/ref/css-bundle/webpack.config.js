/**
 * Created by manhh on 11/6/2016.
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    'about/about/example': './source/about/example.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  resolve: {
    descriptionFiles: ['package.json'],
    extensions: ['', '.js', '.es6']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_module)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        //phai de style-loader truoc css-loader
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.png$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css", {
      allChunks: true
    })
  ]
};