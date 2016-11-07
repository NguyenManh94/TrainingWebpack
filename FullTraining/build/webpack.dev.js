var config = require('./webpack.base');
var webpack = require('webpack');

/*
 config.plugins = config.plugins.concat([
 new webpack.HotModuleReplacementPlugin(),
 //su dung qua may ao hrm
 // new webpack.NoErrorsPlugin()
 ]);
 */

//add loaders support
config.module.loaders = config.module.loaders.concat([
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "url-loader",
    query: {
      name: '[path]img-[sha512:hash:base64:7].[ext]',
      limit: 10024000
    }
  }
]);

//huy bo auto-prefix de test
config.module.loaders[0].loaders = ['style-loader', 'css-loader'];

module.exports = config;