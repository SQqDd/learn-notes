// memoize
// 接收一个参数（fun）,返回一个函数
// 可以对相同输入的结果进行缓存
const _ = require('lodash')

const getArea = function (r) {
  console.log(r)

  return Math.PI * r * r
}
const getAreaWithMemoize = _.memoize(getArea)

console.log(getAreaWithMemoize(4))
console.log(getAreaWithMemoize(4))
console.log(getAreaWithMemoize(4))

// 以上运行结果
// 只有第一次运行的时候，执行了 console.log，接下来无论怎么运行都不会执行 console.log

// 模拟 memoize
/**
 * @param {Function} fn
 * @returns {Function}
 */
const memoize = function (fn) {
  // 定义一个 cache，用来缓存数据；利用闭包
  const cache = {}

  return function () {
    // 用传入的参数作为 key，结果作为 value，存储到 cache
    const key = JSON.stringify(arguments)

    // 先查找 cache 中是否有值，没有就执行 fn 函数得到结果缓存
    cache[key] = cache[key] || fn.apply(this, arguments)
    return cache[key]
  }
}

const getAreaWithMyMemoize = memoize(getArea)

console.log(getAreaWithMyMemoize(4))
console.log(getAreaWithMyMemoize(4))
console.log(getAreaWithMyMemoize(4))

// 模拟成功
