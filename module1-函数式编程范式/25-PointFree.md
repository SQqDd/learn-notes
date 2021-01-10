# PointFree
## 概念
Point Free：我们可以把数据处理的过程定义成与数据无关的合成运算，不需要用到代表数据的那个参数，只要把运算步骤合成到一起，在使用这种模式之前我们需要定义一些辅助的基本运算函数

- 不需要指明处理的数据（不用使用到形参）
- **只需要合成运算过程**（组合函数）
- 需要定义一些辅助的基本运算函数（lodash 提供了一堆辅助函数，map each first 诸如此类的）
- Point Free 是一种编程风格

## 代码
```js
// Hello World -> hello_world
// 非 Point Free 模式
function f(word) {
  return word.toLowerCase().replace(/\s+/g, '_')
}

// Point Free
// 不需要使用到形参
// 将合并运算过程（组合函数）
// 需要定义一些基本的辅助运算函数
const fp = require('lodash/fp')

const f1 = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)

console.log(f1('Hello World')) // hello_world

```

## 总结
- Point Free 编程风格，主要使用组合函数
