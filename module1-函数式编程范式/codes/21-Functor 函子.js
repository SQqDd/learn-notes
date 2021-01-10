// Functor 函子
// 函子是一个容器对象
class Container {
  constructor(value) {
    // 维护一个私有变量，不对外公布
    this._value = value
  }

  // 公布一个 map 返回，用来接收函数，对值（value）进行处理
  map(fn) {
    // 返回一个新的函子
    return new Container(fn(this._value))
  }
}

const con = new Container(5)
              .map(x => x + 1)
              .map(x => x * x)

console.log(con) // Container { _value: 36 }

// new 的编程方式是面向对象编程，为了显得是函数式编程，封装一下 new 的过程
class Functor {
  // 提供一个静态的方法，封装 new 的过程
  static of(value) {
    return new Functor(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return Functor.of(fn(this._value))
  }
}

const fun = Functor.of(2)
              .map(x => x + 1)
              .map(x => x * x)

console.log(fun) // Functor { _value: 9 }
