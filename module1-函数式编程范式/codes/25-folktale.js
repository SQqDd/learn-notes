const { compose, curry } = require('folktale/core/lambda')
const { first, toUpper } = require('lodash/fp')

// folktale 的 curry 第一个参数是，函数的参数个数
let f = curry(2, (x, y) => {
  console.log(x + y)
})

f(1, 2)
f(2)(3)

// 函数组合
let f1 = compose(toUpper, first)

console.log(f1(['one', 'two'])) // ONE
