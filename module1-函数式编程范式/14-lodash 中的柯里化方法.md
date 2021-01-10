# lodash 中的柯里化方法
函数柯里化可以将多元函数转化为一元函数

上例子
```js
const _ = require('lodash')

function getSum(a, b, c) {
  return a + b + c
}

const curried = _.curry(getSum)

console.log(curried(1, 2, 3)) // 6
console.log(curried(1)) // Function
console.log(curried(1)(2, 3)) // 6
console.log(curried(1)(2)) // Function
console.log(curried(1)(2)(3)) // 6

```

## 分析
上面例子中使用了 lodash 提供的 curry 函数。

他的作用是将多元函数转化成一元函数

什么是多元函数呢?

三元函数代表函数接收三个参数，二元函数代表函数接收两个参数，一元函数代表函数接收一个参数

而柯里化是根据传入的参数数量来决定返回结果

如果参数都传够的情况下，直接返回函数结果

参数还没传够的时候，返回函数，用来接收剩余的参数，形成柯里化
