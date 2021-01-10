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

  // 这一个方法，接收的是函子，将两个函子拍扁
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
            .map(fp.toUpper)
            .flatMap(print)
            .join()

console.log(r)
