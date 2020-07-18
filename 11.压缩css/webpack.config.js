const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置node环境变量
// process.env.NODE_ENV = 'development'

// optimize-css-assets-webpack-plugin //压缩css

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss 插件
                require('postcss-preset-env')(),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
      },
    ),
    new MiniCssExtractPlugin(
      {
        // 对输出的css文件进行重命名
        filename: 'css/built.css',
      },
    ),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: 'development',
};
