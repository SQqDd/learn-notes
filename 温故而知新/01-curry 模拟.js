// Curry 模拟
// 接收函数作为参数
// 返回一个函数

function curry(fn) {
  return function curriedFn (...args) {
    // 实参个数不等于形参个数
    if (args.length < fn.length) {
      // 接收剩余参数
      return function (...rest) {
        // 继续调用 curriedFn 判断实参个数与形参个数是否相等
        return curriedFn(...args.concat(rest))
      }
    }
    return fn(...args)
  }
}

function sum(a, b, c) {
  return a + b + c
}

const curriedSum = curry(sum)
const sum1 = curriedSum(1)
console.log(sum1(2, 3))
console.log(curriedSum(1, 2, 3))
