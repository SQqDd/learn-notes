# Functor 总结
## 总结
- 函数式编程的运算不直接操作值，而是由函子去完成（值不对外公布）
- 函子就是一个实现了 map 契约的对象（提供一个 map 方法）
- 可以把函子想象成一个盒子，这个盒子里封装了一个值
- 想要处理盒子里的值，我们需要给盒子的 map 方法传递一个处理值的函数（纯函数，只接收一个值），由这个函数来对值进行处理
- 最终 map 方法返回一个包含新值的盒子（函子）

## 当传入 null、undefined 会发生什么
```js
class Container {
  static of(value) {
    return new Container(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return Container.of(fn(this._value))
  }
}

const c = Container.of(null)
            .map(x => x.toLowerCase()) // 程序抛错，空指针

// 纯函数当中，相同的输入，返回相同的结果，而现在只有输入，没有输出，程序无法继续下去，要怎么解决？请听下回分解
``
