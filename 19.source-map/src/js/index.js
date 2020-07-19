import '../css/iconfont.css';
import '../css/index.less';
import print from './print'

console.log('index.js被加载了')

function add (x, y) {
  return x + y
}

console.log(add(1, 3))

// 一旦module.hot为true，说明开启了HMR功能。
if (module.hot) {
  // 会监听print.js文件的变化，一旦发生变化，其他模块功能不会重新打包
  module.hot.accept('./print.js', function () {
    print()
  })
}