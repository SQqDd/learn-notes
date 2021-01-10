// IO 函子的问题
const fp = require('lodash/fp')
const fs = require('fs')

class IO {
  static of(value) {
    return new IO(function () {
      return value
    })
  }

  constructor(fn) {
    this._value = fn
  }

  map(fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}

// 实现一个 cat 函数，读取文件内容
// 读取文件函数
function readFile(filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf-8')
  })
}

// 打印文件内容
function print(value) {
  return new IO(function () {
    console.log(value)
    return value
  })
}

// 具体实现
// readFile 函数创建一个 IO 函子，内部 _value 是获取文件的方法，并将 IO 函子返回给 print
// print 接收到 readFile 返回的 IO 函子，创建一个 IO 函子，内部 _value 存储的是 readFile 返回的函子
// 此时，IO 函子形成了一种嵌套关系 IO(IO(x))
// 要想获取到文件的内容，需要这样执行
// r._value()._value()
// 第一个 ._value 先获取到 readFile 的 IO 函子，第二个 .value()，直接执行 readFile 的 IO 函子里的 _value，获取文件内容
const cat = fp.flowRight(print, readFile)

const r = cat('package.json')

console.log(r) // IO { _value: [Function] }
console.log(r._value()) // // IO { _value: [Function] }
console.log(r._value()._value()) // 文件内容
