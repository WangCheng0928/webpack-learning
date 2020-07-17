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

  module: {
    rules: [
      //loader配置
    ]
  },
  plugins: [
    //plugins配置
    //默认会创建一个空的html文件， 自动引入打包输出的所有资源（js/css）
    //需求：需要有结构的 html 文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html'文件，并自动引入打包输出的所有资源
      template: './src/index.html'
    })
  ],
  mode: "development"
}