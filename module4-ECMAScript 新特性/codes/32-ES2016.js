// Array.prototype.includes
const arr = [1, 2, 3, NaN]

console.log(arr.indexOf(NaN)) // -1 indexOf 无法查找 NaN
console.log(arr.includes(NaN)) // true includes 可以查找 NaN

// 指数运算符
console.log(Math.pow(2, 10)) // 1024
// 使用指数运算符
console.log(2 ** 10) // 1024
