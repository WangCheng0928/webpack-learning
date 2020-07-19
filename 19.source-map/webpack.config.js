/**
 * 开发环境配置：能让代码运行起来
 * HMR: hot module replacement 热模块替换 / 模块热替换
 * 作用: 一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
 *      极大的提升了构建速度
 *      样式文件：可以使用HMR功能：因为style-loader内部实现了
 *      js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
 *        注意：HMR功能对js的处理，只能处理非入口js文件的其他文件
 *      html文件：默认不能HMR功能，同时会导致问题：html文件不能热更新了
 *        解决：修改entry入口。将html文件引入
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // css 资源默认会打包在js文件中
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude: /\.(html|js|css|jpg|png|gif|less)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './src/index.html'
      }
    )
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 当修改了webpack配置，新配置想要生效，必须重启webpack服务
    hot: true
  },
  /**
   * source-map：一种提供源代码到构建后代码的映射技术（如果构建后的代码出错了，通过映射可以追踪源代码出错的地方）
   * 
   * [iniline-][hidden-][eval-][nosources-][cheap-[module]]source-map
   *  source-map 外部
   *    错误代码准确信息 和源代码的错误位置
   *  iniline-source-map: 内联， 只生成一个内联source-map
   *    错误代码准确信息 和源代码的错误位置
   * 
   *  hidden-source-map: 外部
   *    错误代码错误原因，但是没有错误位置，不能追踪源代码错误，只能提示构建后代码错误位置
   *  eval-source-map: 内联，每一个文件都生成对应的source-map， 都在eval
   *    错误代码准确信息 和源代码的错误位置
   * 内联和外部的区别：1.外部生成了文件，内联没有 2.内联构建速度更快
   * 
   *  nosources-source-map 外部
   *    错误代码准确信息，但是没有任何源代码信息
   *  cheap-source-map  外部
   *    错误代码准确信息  和源代码的错误位置， 但是只能精确到行
   *  cheap-module-source-map 外部
   *    错误代码准确信息  和源代码的错误位置， 但是只能精确到行
   *    module会将loader的source map加入
   *  开发环境：速度快，调试更友好
   *  速度快（eval>inline>cheap>...）
   *    eval-cheap-source-map，
   *    eval-cheap-source-map，
   *  调试更友好
   *    source-map
   *    cheap-moudle-source-map，
   *    cheap-source-map，
   *  ---> eval-source-map (react和vue脚手架默认) / eval-cheap-module-source-map
   *  生产环境：源代码是否隐藏，调试是否需要更友好
   * ---> source-map  / cheap-module-source-map
   */
  devtool: 'eval-cheap-source-map'
}