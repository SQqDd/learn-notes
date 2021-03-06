const _ = require('lodash')

function getSum(a, b, c) {
  return a + b + c
}

const curried = _.curry(getSum)

console.log(curried(1)(2, 3))
console.log(curried(1, 2, 3))
console.log(curried(1)(2)(3))

// curry 分析
// curry 接收一个函数参数，返回一个函数
// 当函数参数形参和实参相等，直接返回结果，否则返回函数，等待接收剩余的参数

/**
 *
 * @param {Function} func
 * @return {Function}
 */
function curry(func) {
  return function curriedFn (...args) {
    // 形参个数小于实参个数
    // 这里形成闭包，缓存 func
    if (args.length < func.length) {
      return function () {
        // 继续调用函数 curriedFn
        // 这里形成闭包，缓存 args
        return curriedFn(...args.concat(Array.from(arguments)))
      }
    }
    // 形参个数等于实参个数
    return func(...args)
  }
}

const myCurry = curry(getSum)

console.log(myCurry(1)(2, 3))
console.log(myCurry(1, 2, 3))
console.log(myCurry(1)(2)(3))
