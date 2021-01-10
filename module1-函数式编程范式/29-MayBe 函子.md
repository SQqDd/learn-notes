# MayBe 函子
## 概念
- 在编程的过程中，可能会遇到很多错误，需要对这些错误进行处理
- MayBe 函子可以对外部的空值（null、undefined）的情况进行处理（控制副作用在允许范围内，让程序正常运行）

## 代码
```js
// May Be
class MayBe {
  constructor(value){
    this._value = value
  }

  static of(value) {
    return new MayBe(value)
  }

  map(fn) {
    // 不存在返回一个值为 null 的函子，否则运行处理函数
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }

  // 判断值是否存在
  isNothing() {
    return this._value === null || this._value === undefined
  }
}

const r = MayBe.of('hello world')
            .map(x => x.toUpperCase())

console.log(r) // MayBe { _value: 'HELLO WORLD' }

// 不过 MayBe 函子有个弊端，如果执行多个 map 的情况下，返回 null，但是无法知道是哪个 map 方法里面返回的
const r2 = MayBe.of('hello world')
            .map(x => x.toUpperCase())
            .map(x => null) // 假设这个处理函数返回结果为 null
            .map(x => x.split())

console.log(r2) // MayBe { _value: null }

```

## 总结
- MayBe 函子的基本解构就是 Functor
- 不过 MayBe 函子多了一个处理空值的情况
- MayBe 函子也有一个弊端，当返回结果为 null，但是没有告诉我们发生了什么错误
