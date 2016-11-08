var webpack = require('webpack');
var config = require('./webpack.dev');
var webpackDevServer = require('webpack-dev-server');
var port = 8080;
//su dung thay tu dong change reload khi thay doi code
//chu y: nho la phai them new webpack.HotModuleReplacementPlugin() o config
// va hot = true
// xem them tai: (https://webpack.github.io/docs/webpack-dev-server.html)
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/",
  "webpack/hot/dev-server");
var compiler = webpack(config);

// su dung thong qua may ao hrm middleware
// config.entry.app.unshift("webpack-hot-middleware/client");
// var hotMiddleware = require('webpack-hot-middleware')(compiler);

var server = new webpackDevServer(compiler, {
  hot: true,
  proxy: {
    "/api": {
      "target": {
        "host": "dantri.com.vn",
        "protocol": 'http:',
        "port": 80
      },
      ignorePath: true,
      changeOrigin: true,
      secure: false
    }
  },
  contentBase: '../dist',
  quiet: false,
  noInfo: false,
  progress: true,
  color: true,
  publicPath: 'http://localhost:8080/',
  stats: {colors: true}
});

// server.use(hotMiddleware);
server.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log(`Server webpack dev running port: ${port}`);
  }
});