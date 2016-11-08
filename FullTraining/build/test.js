require('shelljs/global');
var webpack = require('webpack');
var ora = require('ora'); //ghi tien trinh thuc hien ra
var conf = require('./webpack.test.js');

// var spinner = ora("System is bundle file watch running ....");
// spinner.start();
// spinner.color = 'red';
rm('-rf', 'dist/test'); //xoa het thu muc cu va tao thu muc moi

webpack(conf, function (err, stats) {
  if (err) throw err;

  process.stdout.write(stats.toString({
      color: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
});