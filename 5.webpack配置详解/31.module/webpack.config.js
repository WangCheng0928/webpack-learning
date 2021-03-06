const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    // 文件名称，（指定名称+目录）
    filename: 'js/[name].js',
    //输出文件目录，（将来所有资源输出的公共目录）
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        //只检查src下的js文件
        include: resolve(__dirname, 'src'),
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        oneOf: []
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development'
}