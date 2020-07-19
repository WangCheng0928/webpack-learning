import '../css/index.css';

const add = (x, y) => x + y;

function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}

// eslint-disable-next-line
console.log(add(1, 2));

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));