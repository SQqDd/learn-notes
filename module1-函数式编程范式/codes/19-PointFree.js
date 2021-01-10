// Hello World -> hello_world
// 非 Point Free 模式
function f(word) {
  return word.toLowerCase().replace(/\s+/g, '_')
}

// Point Free
// 不需要使用到形参
// 将合并运算过程（组合函数）
// 需要定义一些基本的辅助运算函数
const fp = require('lodash/fp')

const f1 = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)

console.log(f1('Hello World')) // hello_world
