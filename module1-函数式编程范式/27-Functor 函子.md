# Functor 函子
## 为什么要学 Functor
目前为止，已经学习了一些关于函数式编程的基础，但是还没有要演示函数式编程中如何把副作用控制在可控范围内、异常处理、异步编程等

## 什么是 Functor
- 容器：包含值和值的变形关系（这个变形关系就是函数）
- 函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有 map 方法，map 方法可以运行一个函数对值进行处理（变形关系）

## 代码
```js
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

```

## 总结
- 函子是一个容器对象
- 维护一个值，不对外公布
- 但是提供一个 map 方法，接收一个函数作为参数，用于处理值
- 并返回一个新的函子
- 可以让你使用链式编程
