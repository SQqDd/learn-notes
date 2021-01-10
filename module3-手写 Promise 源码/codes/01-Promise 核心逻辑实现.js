// 先来看 promise 是怎么调用的吧
let promise = new Promise((resolve, reject) => {
  resolve('成功')
  reject('失败')
})

promise.then(value => {
  console.log(value, 'promise')
}, reason => {
  console.log(reason, 'promise')
})

// 分析
/**
 * 1. Promise 是一个类，他接收参数作为函数。这个函数是一个执行器，马上执行
 * 2. Promise 状态有三个， 等待 pending 成功 fulfilled 失败 rejected
 * 3. 执行器上面返回两个参数，分别是 resolve 、reject
 * 4. resolve 将状态改变成 pending -> fulfilled
 * 5. reject 将状态改变成 pending -> rejected
 * 6. Promise 状态一旦改变后无法再改变
 * 7. Promise 原型上有 then 方法，分别返回成功的回调函数（onFulfilled）和失败的回调函数（onRejected）
 * 8. 这两个回调函数会带上成功的结果和失败的原因
 * 9. 这个两个值由执行器的 resolve 和 reject 去接收
 */

const MyPromise = require('./myPromiseBabel')

let myPromise = new MyPromise((resolve, reject) => {
  resolve('成功')
  reject('失败')
})

myPromise.then(value => {
  console.log(value, 'myPromise')
}, reason => {
  console.log(reason, 'myPromise')
})
