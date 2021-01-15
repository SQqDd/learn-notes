// iterator 迭代器
const s = new Set()
s.add(1)
s.add(2)

const iterator = s[Symbol.iterator]()

console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 2, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
