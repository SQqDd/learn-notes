# Pointed 函子
## 概念
- Pointed 函子是实现了 of 静态方法的函子（函子一般都会有这个方法）
- of 方法是为了避免使用 new 来创建对象，使得他更像函数式编程。
- 更深层的含义是，of 方法用来把值放到上下文 Context 中（把值放到容器中，使用 map 来处理）
- 简单来说，就是将值放到一个容器，形成一个上下文，这个容器提供一个 map 方法，供我们去使用这个值

## 代码
```js
class Pointed {
  static of(value) {
    return new Pointed(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return Pointed.of(fn(this._value))
  }
}
```
