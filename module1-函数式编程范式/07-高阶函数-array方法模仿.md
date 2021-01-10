# Array 方法模仿
## map、some、every
```js
const arr = [1, 2, 3, 4]

// map
// map 的作用是返回一个新的数组
const map = function (array, fn) {
  let results = []

  for (let index = 0; index < array.length; index++) {
    results.push(fn(array[index], index))
  }

  return results
}

const newArr = map(arr, (item, index) => item * 2)
console.log(newArr)

// every
// 全部满足条件，返回 true，否则返回 false
const every = (array, fn) => {
  let result = true

  for (let index = 0; index < array.length; index++) {
    result = fn(array[index], index)
    if (!result) {
      break
    }
  }

  return result
}

const r1 = every(arr, (item, index) => item > 0)
const r2 = every(arr, (item, index) => item > 1)
console.log(r1, r2)

// some
// 只要有一个满足条件，马上返回 true，否则返回 false
const some = (array, fn) => {
  let result = true

  for (let [index, value] of array.entries()) {
    result = fn(value, index)
    if (result) {
      break
    }
  }

  return result
}

const s1 = some(arr, (item, index) => item % 2 === 0)
const s2 = some(arr, (item, index) => item % 5 === 0)
console.log(s1, s2)
```
