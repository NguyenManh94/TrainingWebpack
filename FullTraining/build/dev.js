var webpack = require('webpack');
var config = require('./webpack.dev');
var webpackDevServer = require('webpack-dev-server');
var port = 8080;
config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${port}/`
  , "webpack/hot/dev-server"); //su dung thay tu dong change reload khi thay doi code

/*su dung thong qua may ao hrm middleware*/
/*config.entry.app.unshift("webpack-hot-middleware/client");
 var compiler = webpack(config);
 var hotMiddleware = require('webpack-hot-middleware')(compiler);

 var server = new webpackDevServer(compiler, {*/
var server = new webpackDevServer(webpack(config), {
  hot: true,
  /*proxy: {
   "*": {
   target: "http://takeit.vn/",
   changeOrigin: true
   }
   },*/
  contentBase: '../dist',
  quiet: false,
  noInfo: false,
  inline: true,
  progress: true,
  publicPath: '/',
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