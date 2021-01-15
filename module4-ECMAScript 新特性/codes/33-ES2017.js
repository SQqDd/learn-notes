const obj = {
  key1: 1,
  key2: 2
}

// Object.values()
// 有啥用？获取对象里所有属性值，返回一个数组
for (const item of Object.values(obj)) {
  console.log(item) // 1 2
}

// Object.entries()
// 有啥用？
// 返回一个值是 [key, value] 的形式的迭代器对象
// 也可以用于 Map 对象
// 方便我们遍历对象拿到 key 和 value
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value)
}

const m = new Map(Object.entries(obj))
console.log(m.toString()) // [object Map]
for (const [key, value] of m) {
  console.log(key, value)
}

// Object.getOwnPropertyDescriptors(obj)
// obj 需要查找的目标对象
// 返回该对象的所有属性的描述符
const p1 = {
  firstName: 's',
  lastName: 'z',
  get fullName() {
    return this.lastName + this.firstName
  }
}

console.log(Object.getOwnPropertyDescriptors(p1))
/**
 * { firstName:
   { value: 's',
     writable: true,
     enumerable: true,
     configurable: true },
  lastName:
   { value: 'z',
     writable: true,
     enumerable: true,
     configurable: true },
  fullName:
   { get: [Function: get fullName],
     set: undefined,
     enumerable: true,
     configurable: true } }
 */
// 此时返回 p1 对象的属性的描述符，fullName 属性内部定义了 getter 方法，返回自定义 get 的内容，set 方法使用默认函数实现

// 现在新建一个对象，内容跟 p1 一样，只不过名字不一样
const p2 = Object.assign({}, p1)
// 修改 p2 的 firstName, lastName
p2.firstName = 'wd'
p2.lastName = 'x'
// 打印 p2.fullName
console.log(p2.fullName) //zs
// 为什么会这样，
/**
 * Object.assign 方法只会拷贝对象自身的并且可枚举的属性到目标对象。
 * 该方法使用源对象的 [[Get]] 和目标对象的 [[Set]]，所以他会调用相关 getter 和 setter
 * 因此，他分配属性，而不仅仅是复制或定义新的属性
 * 如果合并源包含 getter，这可能使其不适合将新属性合并到原型中。
 * 为了将属性定义（包括其可枚举性）复制到原型，应使用
 * Object.getOwnPropertyDescriptors() 和 Object.defineProperties()
 *
 * 参考：MDN
 */
// 我们可以使用 getOwnPropertyDescriptors 获取到 p1 对象的属性描述符
// 然后再使用 Object.defineProperties() 定义 p2 对象的属性描述符
// 这样子就能 p2 对象就能正常输出 fullName
// getOwnPropertyDescriptors 其实是为了让我们拿到属性描述符，创建一个同类型的新对象
const descriptors = Object.getOwnPropertyDescriptors(p1)
const p3 = Object.defineProperties({}, descriptors)
p3.firstName = 'wd'
p3.lastName = 'x'
console.log(p3.fullName) // xwd

// String.prototype.padStart / String.prototype.padEnd
// 定义字符串长度，剩余位置就填充
// String.prototype.padStart(targetLength, padString)
// targetLength 当前字符串需要填充到的目标长度。如果这个数值小于当前字符串长度，则返回当前字符串本身
// padString 可选；填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则指保留最左侧部分，其他部分会被截断。参数默认值是 " "
// 实际用途：为了让输出字符串排版更好看
const foo = {
  html: 1,
  javascript: 2,
  css: 3
}

for (const [key, value] of Object.entries(foo)) {
  console.log(`${key.padEnd(16, '-')}|${value.toString().padStart(4, '0')}`)
}

/**
 * html------------|0001
 * javascript------|0002
 * css-------------|0003
 */

// 在函数参数中允许添加尾逗号
// 这并不是一个功能，只是一个补充，为了让开发者开发的时候更方便
// 数组和对象都能保留尾逗号，让数据更加的统一，修改起来也更方便，所以函数参数也添加了这个玩意，没什么功能作用

const arr = [
  100,
  200,
  300, // 就是这种尾逗号
]
