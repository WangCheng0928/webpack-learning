import '../css/index.css';

/**
 * 通过js代码，让某个文件被单独打包成一个chunk
 * import动态导入语法，能将某个文件单独打包
 */
import(/*webpackChunkName: 'test' */'./test')
  .then(({ multiple, dele }) => {
    // 文件加载成功
    // eslint-disable-next-line
    console.log(multiple(3, 4))
    // eslint-disable-next-line
    console.log(dele(3, 4))
  })
  .catch(() => {
    // 文件加载失败
    // eslint-disable-next-line  
  })


const add = (x, y) => x + y;

function sum (...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}

// eslint-disable-next-line
console.log(add(1, 2));

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));