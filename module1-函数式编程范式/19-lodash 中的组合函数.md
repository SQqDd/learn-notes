# lodash 中的组合函数
- lodash 组合函数有两个
  - flow() 执行顺序从左到右
  - flowRight() 执行顺序从右到左，用得最多

## 例子
```js
// 将字符串数组中最后一个元素转化成大写字母

const _ = require('lodash')

const reverse = array => array.reverse()
const first = array => array[0]
const toUpper = str => str.toUpperCase()

const f = _.flowRight(toUpper, first, reverse)

console.log(f(['a', 'b', 'c'])) // C

```
