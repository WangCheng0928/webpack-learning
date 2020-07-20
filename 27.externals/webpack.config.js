const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * loader: 1、下载  2、使用
 * plugins 1、下载  2、引入  3、使用
 */

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: "development",
  externals: {
    // 忽略库名 -- npm包名
    jquery: 'jQuery'
  }
}