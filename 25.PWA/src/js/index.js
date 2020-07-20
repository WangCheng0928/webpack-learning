import '../css/index.css';
import { dele } from './test';

const add = (x, y) => x + y;

function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}

// eslint-disable-next-line
console.log(add(1, 2));

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

// eslint-disable-next-line
console.log(dele(6 - 2))

/**
 * 注册serviceWorker
 * 处理兼容性问题
 *
 * 1、eslint不认识window、navigator全局变量
 *    解决：需要修改package.json中的eslintConfig配置
 *    "env": {
        "browser": true
      }
    2、sw代码必须运行在服务器上
      --> node.js
      --> npm i serve -g
          serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => {
        console.log('sw注册成功了');
      })
      .catch(() => {
        console.log('sw注册失败了');
      });
  });
}
