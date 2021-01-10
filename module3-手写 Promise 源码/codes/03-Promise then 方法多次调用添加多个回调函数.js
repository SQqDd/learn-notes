const MyPromise = require('./myPromiseBabel')

let myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('成功。。。'), 2000)
  // setTimeout(() => reject('失败。。。'), 2000)
  // resolve('成功')
  // reject('失败')
})

// 一个 promise 的 then 方法可以多次调用，添加多个回调函数
// 在同步的情况下，then 方法都会根据状态 fulfilled 或者 rejected 直接执行传进来的回调函数
// 在异步的情况下就不行了。then 方法在 pending 的状态下，需要将回调函数存储起来，而且是用数组的方式（then 可以多次调用）
// resolve 执行完的时候就判断数组长度是否为 0，不为 0 就循环执行回调函数

myPromise.then(value => {
  console.log(value, 'myPromise')
}, reason => {
  console.log(reason, 'myPromise')
})

myPromise.then(value => {
  console.log(value, 'myPromise')
}, reason => {
  console.log(reason, 'myPromise')
})

myPromise.then(value => {
  console.log(value, 'myPromise')
}, reason => {
  console.log(reason, 'myPromise')
})
