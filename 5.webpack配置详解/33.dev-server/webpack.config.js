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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  mode: 'development',
  // 解析模块的规则
  resolve: {
    //配置解析模块路径的别名: 优点简写路径，缺点：路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css')
    },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json'],
    // 告诉webpack解析模块是去找哪个目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 监视contentBase目录下的所有文件， 一旦文件变化就会reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/
    },
    compress: true,
    port: 5000,
    host: 'localhost',
    open: true,
    hot: true,
    // 不要显示启动服务器的日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错了，不要全屏提示
    overlay: false,
    //服务器代理，解决开发环境跨域问题
    proxy: {
      // 一旦devServer服务器接受到 /api/xxx的请求，就会把请求转发到另外一个服务器
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写： 将/api/xxx ---> /xxx
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}