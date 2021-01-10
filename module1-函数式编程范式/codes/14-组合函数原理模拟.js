// 将字符串数组中最后一个元素转化成大写字母

const _ = require('lodash')

const reverse = array => array.reverse()
const first = array => array[0]
const toUpper = str => str.toUpperCase()

const f = _.flowRight(toUpper, first, reverse)

console.log(f(['a', 'b', 'c'])) // C


// 组合函数原理模拟
/**
 *
 * @param  {...any} args 接收参数是函数，数量不限制
 * @return {Function}
 */
function compose(...args) {
  return function (value) {
    return args.reverse().reduce(function (acc, fn) {
      return fn(acc)
    }, value)
  }
}

const f1 = compose(toUpper, first, reverse)

console.log(f1(['a', 'b', 'c'])) // C

// es6
const composeWithEs = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value)

const f2 = composeWithEs(toUpper, first, reverse)

console.log(f2(['a', 'b', 'c'])) // C
