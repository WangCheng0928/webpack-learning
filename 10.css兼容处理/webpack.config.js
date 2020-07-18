const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//设置node环境变量
// process.env.NODE_ENV = 'development'

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          /**
           * css 兼容性处理：postcss --> postcss-loader postcss-preset-env
           * postcss-preset-env帮postcss找到package.json中的browserlist里面的配置，通过配置加载
           * 指定的css兼容性样式
           * "browserslist": {
           *    //开发环境 -->设置node环境变量：process.env.NODE_ENV='development'
                "development": [
                  "last 1 chrome version",
                  "last 1 firefox version",
                  "last 1 safari version"
                ],
                // 默认生产环境
                "production": [
                  ">0.2%",
                  "not dead",
                  "not op_mini all"
                ]
              }
           */
          // 直接写'post-loader'使用的是loader的默认配置
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss 插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html'
      },
    ),
    new MiniCssExtractPlugin(
      {
        // 对输出的css文件进行重命名
        filename: 'css/built.css'
      }
    )
  ],
  mode: 'development'
}