const { resolve } = require('path')
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * treeshaking: 将没用到的代码给去掉，减小代码体积
 * 必须条件：
 * 1、必须是生产环境 production
 * 2、必须是采用es6模块
 * 
 */


const commonCssLoader = [
  MiniCssExtractWebpackPlugin.loader,
  'css-loader',
  {
    // 还需要在package.json配置browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')()
      ]
    }
  }
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        // 在package.json配置eslintConfig -->airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        /** oneOf:一种类型的文件只会使用其中的一种进行加载，其他的都不会再去过一遍 
         *  注意：不能有两种或以上的loader处理同一种文件
        */
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader']
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [[
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: { version: 3 },
                  targets: {
                    chrome: '60',
                    firefox: '50'
                  }
                }
              ]],
              /**
               * 相当于开发开发环境的HMR,但是HMR依赖webpack-dev-server，所以
               * 生产环境只有采用babel的缓存，哪个js代码修改了，就编译哪个js
               */
              cacheDirectory: true
            }
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
            exclude: /\.(html|js|css|less|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractWebpackPlugin(
      {
        filename: 'css/built.[contenthash:10].css'
      }
    ),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        template: './src/index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true
        }
      }
    )
  ],
  mode: 'production',
  devtool: 'source-map'
}