# lodash-fp 模块
## fp 模块
函数组合-调试里面说过，对于需要多个参数的函数，使用函数组合，需要先使用柯里化转成一元函数。但是这样不怎么友好

为了解决这个问题，lodash 提供了 fp 模块，里面的函数都是经过柯里化处理的，可以直接用来进行函数组合，为了让我们更友好的使用函数式编程

在 lodash 普通模块中，函数都是**数据在前，函数在后**

```js
const _ = require('lodash')

_.map([1, 2, 3], _.toString) // 数据在前，函数在后
```

而在 fp 模块中，里面的多元函数都是经过柯里化处理，返回函数。而他是**函数在前，数据在后**

```js
// lodash fp
// i will be back -> I-WILL-BE-BACK
const fp = require('lodash/fp')

const f = fp.flowRight(fp.join('-'), fp.map(fp.toUpper), fp.split(' '))
const str = 'i will be back'

console.log(f(str))

```

上面代码跟之前的对比，省去我们给函数进行柯里化的过程，大大提升开发效率
