/** 
 * index.js webpack入口起点文件
 * 
 * 1、运行指令
 *  开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
 *  webpack会以 ./src/index.js为入口文件开始打包，打包输出到 ./build/built.js
 *  整体打包环境，是开发环境
 * 
 *  生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
 *  webpack会以 ./src/index.js为入口文件开始打包，打包输出到 ./build/built.js
 *  整体打包环境，是生产环境
 *  开发环境和生产环境的区别在于： 生产环境对代码进行了压缩
 *  生产环境和开发环境都能将ES6模块化编译成浏览器能识别的模块
 * 
 * 2、webpack能处理js资源和json资源
 *  不能处理css/img等其他资源
 */

import data from './data.json'
// import './index.css'

console.log(data)

function add (x, y) {
  return x + y
}
console.log(add(1, 2))