const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
        minify: {
          //移除空格
          collapseWhitespace: true,
          // 移除注释
          removeComments: true
        }
      },
    ),
  ],
  mode: 'production', // 会自动加载很多插件，其中一个uglifyjs会压缩js代码
};
