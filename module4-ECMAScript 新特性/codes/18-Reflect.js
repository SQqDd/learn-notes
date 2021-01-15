// Proxy 的处理方法默认是 Reflect 的成员方法
const person = {
  name: 'zwd'
}

const personProxy = new Proxy(person, {
  get(target, property) {
    console.log('你的处理逻辑')
    return Reflect.get(target, property)
  }
})

console.log(personProxy.name)

// Reflect 的成员方法
/**
 * Reflect.apply(target, thisArgument, argumentsList)
 * 对一个函数进行调用操作，同时可以传入一个数组作为调用参数
 * 和 Function.prototype.apply() 功能类似
 */

function foo(...args) {
  console.log(args)
}

Reflect.apply(foo, undefined, [1, 2, 3]) // 1, 2, 3

/**
 * Reflect.constructor(target, argumentsList[, new Target])
 * 对构造函数进行 new 操作，相当于执行 new Target(...args)
 */

/**
 * Reflect.defineProperty(target, propertyKey, attributes)
 * 和 Object.defineProperty() 类似。如果设置成功就返回 true
 */

/**
 * Reflect.deleteProperty(target, propertyKey)
 * 作为函数的 delete 操作符，相当于执行 delete target[name]
 */

const obj = {
  name: 1213,
  age: 25,
  height: 155
}

// delete obj['name']
Reflect.deleteProperty(obj, 'name')
console.log(obj) // { age: 25 }

/**
 * Reflect.get(target, propertyKey[, receiver])
 * 获取对象身上某个属性的值，类似于 target[name]
 */

// obj['age']
console.log(Reflect.get(obj, 'age')) // 25

/**
 * Reflect.getOwnPropertyDescriptor(target, propertyKey)
 * 类似于 Object.getOwnPropertyDescriptor()
 * 如果对象中存在该属性，则返回对应的描述符，否则返回 undefined
 */

console.log(Reflect.getOwnPropertyDescriptor(obj, 'age')) // { value: 25, writable: true, enumerable: true, configurable: true }

/**
 * Reflect.getPrototypeOf(target)
 * 获取对象的原型，类似于 Object.getPrototypeOf()
 */

const proto = Reflect.getPrototypeOf(obj)
console.log(proto)

/**
 * Reflect.has(target, propertyKey)
 * 判断一个对象是否存在某个属性，和 in 运算符的功能完全相同
 */

// age in obj
console.log(Reflect.has(obj, 'age')) // true

/**
 * Reflect.isExtensible(target)
 * 判断一个对象是否可扩展（即是否能够添加新的属性）。类似于 Object.isExtensible()
 */

console.log(Reflect.isExtensible(obj)) // true

/**
 * Reflect.ownKeys(target)
 * 返回一个包含所有自身属性（不包含继承属性）的数组。类似于 Object.keys()，但不会受 enumerable（枚举） 影响
 */

// Object.keys(obj)
console.log(Reflect.ownKeys(obj)) // [ 'age', 'height' ]

/**
 * Reflect.preventExtensions(target)
 * 组织新属性添加到对象（例如：防止将来对对象的扩展被添加到对象中）
 * 该方法于 Object.preventExtensions() 相似，但有一些不同点
 */

console.log(Reflect.isExtensible(obj)) // true
Reflect.preventExtensions(obj)
console.log(Reflect.isExtensible(obj)) // false
obj.width = 123
console.log(obj) // width 属性无法添加到 obj 中

/**
 * Reflect.set(target, propertyKey, value[, receiver])
 * 将值分配给属性的函数。返回一个 Boolean，如果更新成功，则返回 true
 */

// obj['age'] = 30
console.log(Reflect.set(obj, 'age', 30)) // true
console.log(obj) // { age: 30, height: 155 }

/**
 * Reflect.setPropertyOf(target, prototype)
 * 设置对象原型的函数，返回一个 Boolean，如果更新成功，则返回 true
 * 与 Object.setPrototypeOf() 方法一样
 */
