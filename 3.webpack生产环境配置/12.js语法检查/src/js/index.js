/* eslint-disable space-before-function-paren */
function add (x, y) {
  return x + y;
}

// 下一行eslint的所有规则都失效 (下一行不进行eslint检查)
// eslint-disable-next-line
console.log(add(2, 5));
