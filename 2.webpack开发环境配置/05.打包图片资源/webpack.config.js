const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      //loader配置
      {
        test: /\.less$/,
        use: [
          'style-loader', 'css-loader', 'less-loader'
        ]
      },
      {
        // 问题不能处理html中的img图片
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 下载url-loader, file-loader
        loader: 'url-loader',
        options: {
          // 图片小于8kb，就会被base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 旧版本有一个问题： url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出现问题: [onject:module]
          // 解决: 关闭url-loader的es6模块化，使用commonjs解析
          // esModule : false
          //给图片进行重命名
          // [hash:10]去图片的hash的前10位
          // [ext]取原来图片的扩展名
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    //plugin配置
    new HtmlWebpackPlugin(
      {
        template: './src/index.html'
      }
    )
  ],
  mode: 'development'
}