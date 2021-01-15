# Set 集合
## 描述
- Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象的引用
- Set 对象是值的集合，你可以按照插入的顺序迭代他的元素。
- Set 中的元素只会出现一次，即 Set 中的元素是唯一的（无法重复添加）

## 代码 1
```js
// 创建一个 Set 集合
const mySet = new Set()

// 在 Set 对象尾部添加一个元素。返回该 Set 对象
// 可以使用链式编程，如果重复添加相同值，会把相同值给忽略掉
mySet.add(1).add(2).add(1)

console.log(mySet) // Set { 1, 2 }

// Set.prototype.delete(value)
// 移除 Set 中与这个值相等的元素，返回 Set.prototype.has(value) 在这个操作前会返回的值（即如果该元素存在，返回 true，否则返回 false）
// Set.prototype.has(value) 在此后会返回 false
console.log(mySet.delete(1)) // true
console.log(mySet) // Set { 2 }

// Set.prototype.entries()
// 返回一个新的迭代器对象，该对象包含 Set 对象中的按插入顺序排列的所有元素的值的 [value, value] 的数组。
// 为了使这个方法和 Map 对象保持相似，每个值的键和值相等
mySet.add(3).add(4)
const result = mySet.entries()
console.log(result)
for (let i of result) {
  console.log(i)
}
// 依次输出 [ 2, 2 ] [ 3, 3 ] [ 4, 4 ]

// Set.prototype.forEach(callbackFn[, thisArg])
// 按照插入顺序，为 Set 对象中的每个值调用一次 callBackFn
// 如果提供了 thisArg 参数，回调中的 this 会是这个参数
// 类似于 Array.prototype.forEach
mySet.forEach(item => {
  console.log(item) // 依次输出 2 3 4
})

// Set.prototype.has(value)
// 返回一个 Boolean，表示该值在 Set 中是否存在
console.log(mySet.has(2)) // true
console.log(mySet.has(5)) // false

// Set.prototype.values()
// 返回一个新的迭代器对象，该对象包含 Set 对象中的按插入顺序的所有元素的值
const result2 = mySet.values()
console.log(result2)
for (let i of result2) {
  console.log(i) // 依次输出 2 3 4，输出结果与 entries 不同
}

// Set 对象可以使用 ES2015 提供的 for...of... 去遍历
for (let i of mySet) {
  console.log(i) // 依次输出 2 3 4，与 Set.prototype.values() 返回的迭代器遍历结果一样
}

```

## 代码 2
```js
// Set 应用场景 1
// 可以对数组进行去重
const arr = [1, 2, 3, 1, 2, 4]

const arrSet = new Set(arr) // 返回一个 Set 对象，里面的值不会重复
console.log(arrSet) // Set { 1, 2, 3, 4 }
// 要想转回数组，可以使用 Array.from 或者 ...
// const newArr = Array.from(arrSet)
const newArr = [...arrSet]
console.log(newArr) // [ 1, 2, 3, 4 ]
```
