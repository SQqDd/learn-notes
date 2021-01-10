const MyPromise = require('./myPromiseBabel')

let promise = new MyPromise((resolve, reject) => {
  resolve('成功')
})

promise.then(value => {
  console.log(value)
  return 100
}).then(value => {
  console.log(value) // 100
}).then(value => {
  console.log(value)
})

// promise 中的 then 方法是可以链式调用的
// then 方法拿的是上一个回调函数的返回值
// 怎么实现
// 链式调用 -> 回调函数返回新的 Promise 对象
// 下一个 then 方法回调的值是上一个 then 方法回调的返回值 -> 新 Promise 对象 resolve(回调的返回结果)
