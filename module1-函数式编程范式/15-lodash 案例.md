# lodash 案例
上例子
```js
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

const haveSpace = match(/\s+/g) // 这里的 reg 是固定变量
const haveNumber = match(/\d+/g)

// 实现一个函数 - 查找数组中含空格的子项
const filter = _.curry(function (func, array) { // 这里的 func 是固定变量
  return array.filter(func)
})

const findSpace = filter(haveSpace) // [ 'hello world' ]

console.log(findSpace(['hello world', 'hello_world']))

const findNumber = filter(haveNumber)

console.log(findNumber(['1', '2a2', 'abc'])) // [ '1', '2a2' ]

// es6 改造
const filterWithEs = _.curry((func, array) => array.filter(func))
const findSpaceWithEs = filterWithEs(haveSpace)

console.log(findSpaceWithEs([' ', '1'])) // [ ' ' ]

```

## 总结
- 柯里化是函数式编程中的一种实现方式
- 柯里化使得函数的可重用性更高
