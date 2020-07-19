const { resolve } = require('path')
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 缓存：
 *  babel缓存
 *  --> 让第二次打包构建速度更快
 * 文件资源缓存：
 *  hash：每次webpack构建时会生成一个唯一的hash值
 *  问题：因为js和css同时使用一个hash值，如果重新打包，会导致所有缓存失效（可能我只想改动一个文件）
 * chunkhash:根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
 *  问题：js和css的hash值还是一样的，因为css是在js中被引入的，所以属于同一个chunk
 * contenthash：根据文件内容生成hash值。不同文件hash值一定不一样
 *  --> 让代码上线运行缓存更好使用
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