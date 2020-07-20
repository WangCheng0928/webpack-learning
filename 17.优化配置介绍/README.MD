# webpack 性能优化

- 开发环境性能优化
- 生产环境性能优化

## 开发环境性能优化

- 优化打包构建速度
  - HMR
- 优化代码调试（sourceMap 进行调试）
  - source-map

## 生产环境性能优化

- 优化打包构建速度
  - oneOf
  - babel 缓存
  - 多进程打包
  - externals 将哪些文件不进行打包，那么就需要手动引入 cdn
  - dll 让某些库单独打包，然后其他的文件再打包 AddAssetHtmlWebpackPlugin
- 优化代码运行的性能
  - 资源文件缓存(hash-chunkhash-contenthash)
  - tree shaking
  - code split (单入口，多入口) optimization splitChunks
  - 懒加载和预加载
  - PWA 离线可访问技术 boxWorkerPlugin serviceWorker
