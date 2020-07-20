const { resolve } = require('path');

/* eslint-disable space-before-function-paren */
const add = (x, y) => x + y;
// eslint-disable-next-line

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('js兼容行处理');
    resolve();
  }, 1000);
});

console.log(promise);
console.log(add(2, 5));
