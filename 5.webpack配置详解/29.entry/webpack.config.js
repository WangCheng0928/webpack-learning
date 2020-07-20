const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * 1.string --> './src/index.js'
 * 单入口，打包形成一个chunk。输出一个bundle文件 此时chunk的名称默认是main
 * 2.array --> ['./src/index.js', './src/add.js'] 
 * 多入口，所有入口文件最终会形成一个chunk，输出只有一个bundle文件
 *    -->只有在HMR功能中热更新有效
 * 3.object
 * 多入口，有几个入口文件就形成几个chunk，输出几个bundle文件
 * 此时chunk的名称是 key
 */

module.exports = {
  entry: {
    index: './src/index.js',
    add: './src/add.js'
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}