var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('css/[name].min.css');
var autoprefixer = require('autoprefixer'); //tu dong fix css voi cac trinh duyet
var _ = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var root = path.resolve(__dirname);

module.exports = {
  entry: {
    app: ['./src/main.css', './src/main.js'],
    "publicJS/ex2": "./src/publicJS/ex2.js",
    "publicJS/ex1": "./src/publicJS/ex1.js",
    "app-home": "./src/app-home"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
    // publicPath: '/dist/'
  },
  resolve: {
    extension: ['', '.js', '.css']
  },
  devServer: {
    progress: true,
    port: 82,  //default: 8080
    inline: true,
    contentBase: './dist',
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
        loaders: ['style', 'css', 'resolve-url']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name]-[hash:7].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=[path]-[name].[ext]"
      }
    ]
  },
  plugins: [
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
      hash: true, //them thẻ <script> với đường link đính kèm 1 mã hash
      cache: true, //cache file nếu có ko co thay đổi thì ko bundle lại
      showErrors: false, //neu co loi sẽ ghi vào file html
      minify: false, //false: ko minify html ngước lại tru: minify html
      filename: 'index.html',
      favicon: 'src/favicon.ico', //them file favicon vào trang html
      /*nạp các nhánh javascript bundle vào file html*/
      chunks: ['app', 'publicJS/ex-common', 'publicJS/ex2', 'publicJS/ex1', 'app-home'],
      chunksSortMode: function (a, b) {
        return (a.names[0] > b.names[0]) ? 1 : -1;
      }, //sắp xếp lại các file script chèn vào theo đúng thứ tự
      inject: 'body' //có 2 gia trị là body và head (chèn mã script vào nơi tương ứng)
    })
  ]
};