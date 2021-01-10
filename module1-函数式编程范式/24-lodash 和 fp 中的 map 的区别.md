# lodash 和 lodash/fp 中的 map 的区别
## 代码
```js
// lodash 和 lodash/fp 中的 map 的区别
// lodash map
const _ = require('lodash')

console.log(_.map(['1', '22', '10'], parseInt)) // [ 1, NaN, 2 ]

const fp = require('lodash/fp')

console.log(fp.map(parseInt)(['1', '22', '10'])) // [ 1, 22, 10 ]

```

## 分析
- 为什么 lodash 的 map 返回结果不正常，而 fp 中的 map 返回结果正常
  - 因为 lodash 的 map，第二个参数函数是接收三个参数，分别是 item、index 和 array
  - 由于 parseInt 本身接收两个参数，所以运行过程是这样的
```js
parseInt('1', 0, array)
parseInt('22', 1, array)
parseInt('10', 0, array)
```
![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210103154520.png)

- parseInt 第二个参数是几进制，由于没有 1进制，所以返回 NaN
- 解决办法：将 parseInt 柯里化，只接收一个参数
- fp 的 map 为什么又能正常运行呢
  - 因为 fp 的 map，只会给接收的函数传入一个参数（数组的元素），不会传其他元素
