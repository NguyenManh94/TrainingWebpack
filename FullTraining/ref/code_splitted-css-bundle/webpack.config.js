var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'output': './example.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          notExtractLoader: "style-loader",
          loader: "css-loader"
        })
      },
      {test: /\.png$/, loader: "file-loader"}
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css", {
      allChunks: true
    })
  ]
};