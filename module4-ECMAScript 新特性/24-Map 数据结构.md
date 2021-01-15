# Map 数据结构
## 描述
- 普通对象新增属性，属性名（键）只能是字符串，属性值（值）可以是任意类型的值
- 如果普通对象的键使用其他类型的值，内部检测到不是字符串类型，会调用 toString 的方法将它转成字符串
- 而 Map 数据结构存储的属性键值都可以为任意类型的数据

## 代码
```js
const obj = {}

obj[true] = true
obj[123] = 123
obj[{ a: 1 }] = '1'

console.log(Object.keys(obj)) // [ '123', 'true', '[object Object]' ] - 内部将不是字符串的键调用 toString 方法
// 如果想使用任意类型的键去存储值，就没法获取到正确的值

// Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个键或一个值

// 创建一个 Map 对象
const myMap = new Map()

// 获取 Map 对象的键值对的数量
console.log(myMap.size) // 0

// 移除 Map 对象的所有键值对
myMap.clear()

// 添加键
const tom = { name: 'tom' }
const mary = { name: 'mary' }
myMap.set(tom, 90)
myMap.set(mary, 70)

// 读取键
console.log(myMap.get(tom)) // 90

// 删除键
myMap.delete(tom)
console.log(myMap) // Map { { name: 'mary' } => 70 }

// 是否存在某个键对应的值
console.log(myMap.has(tom)) // false
console.log(myMap.has(mary)) // true

// Map.prototype.forEach(callbackFn[, thisArg])
// 按插入顺序，为 Map 对象里的每一个键值对调用一次 callbackFn。
// 如果为 forEach 提供 thisArg，他将在每次调用中作为 this 值
myMap.set(tom, 100)
myMap.forEach((value, key) => {
  console.log(value, key) // 依次输出 70 { name: 'mary' }   100 { name: 'tom' }
})

// Map.prototype.keys()
// 返回一个新的迭代器对象，他按插入顺序包含了 Map 对象中每个元素的键
// 类似于 Object.keys()
const keys = myMap.keys()
console.log(keys)
for(let i of keys) {
  console.log(i) // 依次输出 { name: 'mary' }  { name: 'tom' }
}

// Map.prototype.values()
// 返回一个新的迭代器对象，他按插入顺序包含了 Map 对象中的每个元素的值
const values = myMap.values()
console.log(values)
for (let i of values) {
  console.log(i) // 依次输出 70  100
}

// Map.prototype.entries()
// 返回一个新的迭代器对象，他按插入顺序包含了Map 对象中的 [key, value] 数组
const entries = myMap.entries()
console.log(entries.next().value) // [ { name: 'mary' }, 70 ]
console.log(entries.next().value) // [ { name: 'tom' }, 100 ]

```
