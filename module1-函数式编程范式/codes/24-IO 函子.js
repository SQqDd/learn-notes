// IO 函子
const fp = require('lodash/fp')

class IO {
  // of 函数接收一个值，以函数返回该值的形式创建 IO 函子
  static of(value) {
    return new IO(function () {
      return value
    })
  }

  // 这里的 _value 是函数
  constructor(fn) {
    this._value = fn
  }

  //
  map(fn) {
    // 这里使用 lodash 的 fp 模块，将当前 IO 函子存储的函数和处理函数组合起来
    // 而处理函数接收当前 IO 函子的存储的值，去进行操作
    // 并返回一个函数创建新的 IO 函子，其间不会执行到不纯的操作，因为都封装好，丢给调用者去执行 IO 函子的 _value
    return new IO(fp.flowRight(fn, this._value))
  }
}

// 用法
// process 是 node 的进程对象，执行不纯的操作
// map 中的处理函数，接收一个参数，是当前函子存储的 process
// 并将 process.execPath(获取当前路径 - 不纯的操作)操作返回给新的函子
const r = IO.of(process).map(p => p.execPath)

console.log(r) // IO { _value: [Function] }

// 要想执行 process.execPath 直接调用 r._value()
console.log(r._value())
