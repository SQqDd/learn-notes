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

// Either 函子的另外一个用途，就是代替 try...catch 处理异常，使用左值表示错误
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
