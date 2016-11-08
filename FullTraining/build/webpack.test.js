var path = require('path');
var config = require('./webpack.base');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('css/[name].min.css');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var root = path.resolve(__dirname, '../');
var autoprefixer = require('autoprefixer'); //tu dong fix css voi cac trinh duyet
var _ = require('lodash');


/*function support sort list
 * Do cac dau ra inject vao khong dung => su dung de sap xep thu tu dau ra*/
var orderByList = function (list) {
  return function (chunk1, chunk2) {
    var index1 = list.indexOf(chunk1.names[0]);
    var index2 = list.indexOf(chunk2.names[0]);
    if (index2 == -1 || index1 < index2) {
      return -1;
    }
    if (index1 == -1 || index1 > index2) {
      return 1;
    }
    return 0;
  };
};
var optionHtmlMinify = {
  html5: true,
  collapseWhitespace: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeEmptyAttributes: true,
  minifyCSS: true,
  minifyJS: true
};

//add entry new
var new_entry = {
  "publicJS/ex2": "./src/publicJS/ex2.js",
  "app-home": "./src/app-home"
};
_.merge(config.entry, new_entry); //use lodash add object
_.merge(config, {watch: true});
_.merge(config.output, {publicPath: '/'});//Set path resolve url image in css
_.merge(config.module, {
  preLoaders: [
    {
      test: /\.js$/,
      exclude: /(node_module|bower_component)/,
      loader: 'eslint-loader',
    }
  ]
});
_.merge(config, {
  eslint: {
    configFile: path.resolve(root, '.eslintrc')
  }
});

//add loaders support
config.module.loaders = config.module.loaders.concat([
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader?name=[path][name].[ext]"
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader',
    query: {
      limit: 10240,
      name: '[path][name].[ext]'
    }
  }
]);

// config.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor.min', 'vendor.min.js'));
//add plugin support with env: production, su dung concat
config.plugins = config.plugins.concat([
  extractCSS,
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compress: {
      warnings: false
    }
  }),
  /*Co the tao nhieu common chunk plugin*/
  /* new webpack.optimize.CommonsChunkPlugin({
   name: "publicJS/ex-common",
   chunks: ["publicJS/ex1", "publicJS/ex2"]
   }),*/
  /* new webpack.optimize.CommonsChunkPlugin({
   name: 'vendor/vendor',
   chunks: ['vendor/vendor', 'bootstrap']
   }),*/
  new HtmlWebpackPlugin({
    template: path.resolve(root, 'src/index.html'),
    hash: true,
    cache: true,
    showErrors: false, //neu co loi sẽ ghi vào file html
    minify: optionHtmlMinify,
    filename: 'index.html',
    favicon: 'src/favicon.ico',
    // chunks: ['css/style', 'app', 'publicJS/ex-common', 'publicJS/ex2', 'publicJS/ex1', 'app-home'],
    chunks: ['vendor', 'app', 'publicJS/ex2', 'app-home'],
    chunksSortMode: orderByList(['vendor.min', 'app', 'publicJS/ex2', 'app-home']),
    inject: 'body' //value: head =>header, true => lan lon ca 2
  })
]);

/*config add source-map*/
// config.devtool = "source-map";
config.postcss = [
  autoprefixer({browsers: ['last 10 versions']})
];

var cssLoaders = config.module.loaders[0].loaders;
config.module.loaders[0].loaders = null;
config.module.loaders[0].loader = extractCSS.extract(cssLoaders.slice(1, 4));

module.exports = config;