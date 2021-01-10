# Either 函子
## 概念
- Either 两者中的任何一个
- 条件运算 if...else 是最常见的运算之一，函数式编程里，使用 Either 函子表达
- Either 函子内部有两个值：左值（Left）和右值（Right）。
- 右值是正常情况下使用的值，左值是右值不存在时使用的默认值
- Either 函子有两个用法
  - 提供默认值
  - 异常处理（异常会使得函数无法得到结果，变得不纯）

## 代码
### 提供默认值
```js
// Either
class Either {
  static of(left, right) {
    return new Either(left, right)
  }

  constructor(left, right) {
    this.left = left
    this.right = right
  }

  map(f) {
    return this.right ?
      Either.of(this.left, f(this.right)) :
      Either.of(f(this.left), this.right)
  }
}
// right 有值就处理 right 的值，否则处理 left 的值
// 通过这种方式，Either 函子表达了条件运算
// Either 函子最常见用途，提供默认值
Either
  .of({ address: 'xxx' }, user.address)
  .map(updateField)

// 上面代码中，如果用户没有提供地址，Either 函子就会使用左值的默认地址
```

### 异常处理
```js
// Either

// 创建两个函子，一个是用来处理异常，一个是用来返回正常结果
class Left {
  static of(value) {
    return new Left(value)
  }

  constructor(value) {
    this._value = value
  }

  // 异常处理
  map(fn) {
    return this
  }
}

class Right {
  static of(value) {
    return new Right(value)
  }

  constructor(value) {
    this._value = value
  }

  // 正常处理
  map(fn) {
    return Right.of(fn(this._value))
  }
}

const r1 = Left.of(21)
              .map(x => x.toString())
const r2 = Right.of(21)
              .map(x => x + 1)

console.log(r1, r2) // Left { _value: 21 } Right { _value: 22 }
// Left 返回的是本身，而 Right 返回处理结果的函子

// 创建一个解析 JSON 的函数
function parseJSON(str) {
  try {
    // 没有异常使用 Right
    return Right.of(JSON.parse(str))
  } catch (e) {
    return Left.of({ error: e.message })
  }
}

const str1 = '{ name: zs }'
const str2 = '{ "name": "zs" }'
const r3 = parseJSON(str1)

console.log(r3) // Left { _value: { error: 'Unexpected token n in JSON at position 2' } }

const r4 = parseJSON(str2)
              .map(x => x.name.toUpperCase())

console.log(r4) // Right { _value: 'ZS' }

const r5 = parseJSON(str2)
              .map(x => x.name.toUpperCase())
              .map(x => null)
              .map(x => x.toUpperCase()) // 依然会报错

```

## 总结
- Either 函子只能做 if...else... 去处理异常
- 但是如果继续 .map 下去，某个阶段返回 null，还是会出现程序错误。
- Either 函子只是解决了 MayBe 函子当值返回 null 的时候，无法明确告诉发生了什么错误的问题
- Either 函子能处理报错信息
