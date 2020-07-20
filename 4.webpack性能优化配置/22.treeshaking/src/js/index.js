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