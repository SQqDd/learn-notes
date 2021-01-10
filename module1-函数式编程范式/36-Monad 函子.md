# Monad 函子
## 概念
- 一个函子如果具有 join 和 of 两个方法，并遵守一些定律就是一个 Monad
- Monad 函子是可以变扁（flatMap）的 Pointed 函子
- Monad 函子内部值存储的是函数

## 代码
```js
// Monad 函子
const fp = require('lodash/fp')
const fs = require('fs')

class Monad {
  static of(value) {
    return new Monad(function () {
      return value
    })
  }

  constructor(fn) {
    this._value = fn
  }

  map(fn) {
    return new Monad(fp.flowRight(fn, this._value))
  }

  join() {
    return this._value()
  }

  flatMap(fn) {
    return this.map(fn).join()
  }
}

function readFile(filename) {
  return new Monad(function () {
    return fs.readFileSync(filename, 'utf-8')
  })
}

function print(value) {
  return new Monad(function () {
    return value
  })
}

const r = readFile('package.json')
            // .map(fp.toUpper)
            .flatMap(print)
            .join()

console.log(r)

```

## 分析
- readFile('package.json').flatMap(print).join() 的执行过程
- readFile('package.json') 先返回一个 IO 函子 A，内部的函数是读取文件内容
- .flatMap(print) 接收 print 函数，然后调用 A 函子内部的 map 方法，使用 flowRight 和 _value 组合成函数，并返回新的函子 B
- .join() 此时调用 B 函子的 join 方法，相当于执行 this._value()，最终得到文件内容
- 与 IO 函子嵌套的区别
- IO 嵌套是 IO(IO(x))，函子接收函子
- 而 Monad 是调用 flatMap，将接收的函子和内部的 _value 函数组合起来，并返回新的函子
- 这时候直接调用 join 方法
- IO 嵌套执行是这样的 flowRight(print, readFile)； readFile 返回函子给 print
- Monad 执行是这样的 readFile().flatMap(print) -> flatMap 将 this._value 和 print 组合成新的函数，并执行 print 返回新的函子

## 总结
- Monad 解决了 IO 函子的嵌套问题
- Monad 函子接收普通值的时候（包括普通函数）使用 map 方法
- 接收函子的时候使用 flatMap 方法
