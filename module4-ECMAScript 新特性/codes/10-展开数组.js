// 使用 console.log 输出数组的内容
const arr = [1, 2, 3]

// 笨重
console.log(arr[0], arr[1], arr[2]) // 1 , 2, 3

// 好一点的
console.log.apply(console, arr)

// 高级一点的
console.log(...arr)
