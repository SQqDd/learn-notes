// Symbol.for(key)
// 使用给定的 key 搜索现有的 symbol，如果找到则返回该 Symbol。
// 否则将使用给定的 key 在全局 symbol 注册表中创建一个新的 symbol
// key 只能传入字符串，如果传入其他值，会调用 toString() 方法转换成字符串

console.log(
  // Symbol('foo') === Symbol('foo') // false
  // Symbol.for('foo') === Symbol.for('foo') // true
  Symbol.for(true) === Symbol.for('true') // true    true.toString --> 'true'
)

// Symbol.iterator
// 一个返回一个对象默认迭代器的方法。被 for ... of 使用


// Symbol.hasInstance 用于判断某对象是否为某构造器的实例
// 因此你可以用它自定义 instanceof 操作符在某个类上的行为
class Array1 {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance)
  }
}

console.log([] instanceof Array1) // true

// Symbol.toStringTag
// 用于对象的默认描述的字符串值。被 Object.prototype.toString() 使用，决定他的返回值
const obj = {
  [Symbol.toStringTag]: 'MyObject',
  foo: 'foo'
}

console.log(obj.toString()) // 输出 [object MyObject] 而不是 [object Object]

for (let key in obj) {
  console.log(key) // foo
}

console.log(Object.keys(obj)) // ['foo']
console.log(JSON.stringify(obj))

// for ... in 、Object.keys()、JSON.stringify() 都无法对 symbol 值进行操作，更符合私有属性

// 要想获取对象的 symbol 值，可以通过 Object.getOwnPropertySymbols()
console.log(Object.getOwnPropertySymbols(obj)) // [ Symbol(Symbol.toStringTag) ]
