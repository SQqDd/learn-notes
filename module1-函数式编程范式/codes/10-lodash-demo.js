// 实现一个函数查找字符串中是否有空格、数字
// 使用柯里化

// 普通版本
''.match(/\s+/g)
''.match(/\d/g)

// 柯里化
const _ = require('lodash')

const match = _.curry(function (reg, str) {
  return str.match(reg)
})

const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)

// 实现一个函数 - 查找数组中含空格的子项
const filter = _.curry(function (func, array) {
  return array.filter(func)
  // 当时 array.filter(func) 这里有点疑惑，其实这里接收了被柯里化的 haveSpace 函数
  // haveSpace 还需要接收一个参数才会返回结果
  // 而这个接收参数是数组的子项 item
  // 如果满足条件则返回数组，否则返回 null，通过隐式转义成 true 和 false。恰好 filter 是根据 true 和 false 来返回结果
})

const findSpace = filter(haveSpace) // [ 'hello world' ]

console.log(findSpace(['hello world', 'hello_world']))

const findNumber = filter(haveNumber)

console.log(findNumber(['1', '2a2', 'abc'])) // [ '1', '2a2' ]

// es6 改造
const filterWithEs = _.curry((func, array) => array.filter(func))
const findSpaceWithEs = filterWithEs(haveSpace)

console.log(findSpaceWithEs([' ', '1'])) // [ ' ' ]
