import '../css/index.css';

console.log('index.js 文件被加载了～')
/**
 * 懒加载：当文件需要使用时才加载
 * 预加载：prefetch：true 会在使用之前，提前加载js文件
 * 正常加载可以认为时并行加载（同一时间加载多个文件）
 * 预加载 webpackPrefetch: 等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
 */
document.getElementById('btn').onclick = function () {
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(() => {
    console.log(111)
  })
}

