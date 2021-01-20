// @flow

// 字面量类型
const a: 'foo' = 'foo' // a 变量只能赋值 foo

// 一般字面量类型都是联合使用
const b: 'success' | 'error' | 'warning' = 'success'

// 变量可以定义多种类型
const c: string | number = 123 // 可以是 string 也可以是 number

// 可以定义类型别名
const StringOrNumber = string | number
const d: StringOrNumber = '123'

// MayBe 类型 -> 类型前添加 ?，表示除了接收指定类型，还可以接收 null 和 undefined
const e: ?number = null
// 其实就相等于以下代码（ps：别跟可选成员搞混了）
const f: number | null | void = undefined

// Mixed -> 参数可以接收任意类型
function passMixed(value: mixed) {
  // todo
  // 由于 value 指定 mixed，但是这里需要的 number，而此时编辑器就会提示错误
  // return value * value // 编辑器报错
  // 怎么解决？
  if (typeof value === 'number') {
    return value * value
  }

  if (typeof value === 'string') {
    return value.substr(1)
  }
}

passMixed(123)
passMixed('123')

// Any -> 参数可以接收任意类型
function passAny(value: any) {
  // todo
  // 编辑器不会提示错误
  value.substr(1)

  return value * value
}


passAny(123)
passAny('123')

// Mixed 与 Any 的区别
// Mixed 是强类型，在语法层面上就会报错；而 Any 是弱类型，在语法层面上不会报错，执行的时候才会报错
