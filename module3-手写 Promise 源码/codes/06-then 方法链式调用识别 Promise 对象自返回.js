const promise = new Promise((resolve, reject) => {
  resolve(100)
})


const promise2 = promise.then(value => {
  console.log(value)
  return promise2
})

promise2.then(value => {
  console.log(value, 'promise2') // 没有执行
}, reason => {
  console.log(reason.message, 'promise2') // TypeError: Chaining cycle detected for promise #<Promise> promise2
})

/**
 * 上面代码所示，原生 Promise 是不允许 Promise 对象自己返回自己。否则会无限循环调用自己
 * 原生 Promise 遇到自返回的情况下，会在失败的回调函数报一个类型的错误
 * 怎么去实现？
 * 将 then 方法返回的 Promise 对象和成功回调的返回结果进行比较。如果相等，则返回自身，调用自身的 reject；否则继续运行下去
 */

 const MyPromise = require('./myPromiseBabel')

 const myPromise = new MyPromise((resolve, reject) => {
   resolve(100)
 })

const myPromise2 = myPromise.then(value => {
  // 这里为什么能直接 return myPromise2
  // 是因为 promise 内部 then 方法回调调用是用异步调用的。then 的返回 promise 对象在同步代码中
  return myPromise2
})

myPromise2.then(value => {
  console.log(value, 'myPromise2')
}, reason => {
  console.log(reason.message, 'myPromise2') // Chaining cycle detected for promise #<Promise> myPromise2
})
