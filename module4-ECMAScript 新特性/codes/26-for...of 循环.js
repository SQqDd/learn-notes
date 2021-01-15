// for...of 循环
const arr = [100, 200, 300, 400]

for (const item of arr) {
  console.log(item)
}

// 数组 forEach 无法使用 break 关键字终止遍历
// for...of 循环可以使用 break 终止循环

// arguments 可以使用 for...of 循环
// Set、Map 可以使用 for...of

// Set
const s = new Set()
s.add(1)
s.add(2)

for (const item of s) {
  console.log(item) // 依次输出 1 2
}

// Map
const m = new Map()
m.set('key', 123)
m.set('key2', 2)

for (const item of m) {
  console.log(item) // 依次输出 [ 'key', 123 ]; [ 'key2', 2 ]
}

for (const [key, value] of m) {
  console.log(key, value) // 依次输出 key 132; key2 2
}

// Object
// 普通对象无法使用 for...of，因为他没有迭代器 iterator
const obj = {
  a: 1,
  b: 2
}

for (const item of obj) { // TypeError: obj is not iterable ----- obj 不可迭代
  console.log(item)
}
