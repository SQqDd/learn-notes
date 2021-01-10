// forEach
// 返回每一项的内容和索引作为函数的参数
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i)
  }
}

const arr = [1, 2, 3, 4, 5]

forEach(arr, (item, index) => {
  console.log(item, index)
})

// filter
// 返回满足条件的结果数组
function filter(array, fn) {
  const results = []

  for (let i = 0; i < array.length; i++) {
    if (fn(array[i], i)) {
      results.push(array[i])
    }
  }

  return results
}

const results = filter(arr, (item, index) => {
  return item % 2 === 0
})

console.log(results)

// find
// 返回数组里第一个符合条件的子项
function find(array, fn) {
  let item = undefined

  for (let i = 0; i < array.length; i++) {
    if (fn(array[i], i)) {
      item = array[i]
      break
    }
  }

  return item
}

const item = find(arr, (item) => {
  return item === 2
})

console.log(item)
