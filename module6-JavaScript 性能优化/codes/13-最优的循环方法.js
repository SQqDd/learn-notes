// 普通 for 循环
const arr = [1, 2, 3, 4, 5]

for (let i = 0; i < arr.length; i++) {
  console.log(i)
}

// forEach
const arr = [1, 2, 3, 4, 5]

arr.forEach(item => {
  console.log(item)
})

// for...in
const arr = [1, 2, 3, 4, 5]

for (let i in arr) {
  console.log(arr[i])
}
