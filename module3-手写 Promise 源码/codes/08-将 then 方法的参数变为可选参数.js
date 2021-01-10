const promise = new Promise((resolve, reject) => {
  resolve('成功')
})

promise.then().then().then(value => console.log(value)) // 成功

const promise2 = new Promise((resolve, reject) => {
  reject(new Error('失败'))
})

promise2.then().then().then(value => {}, reason => {
  console.log(reason.message) // 失败
})

/**
 * 上面代码所示，原生 promise 中的 then 方法如果没有接收到参数，会将当前结果一直传递下去，直至 then 方法接收了回调函数
 * 怎么去实现？
 * then 方法如果没有接收到参数就伪造一个函数参数 value => value; reason => { throw reason }
 * 看下面代码
 */

promise.then().then().then(value => console.log(value))
// 相当于
promise.then(value => value).then(value => value).then(value => console.log(value))

const MyPromise = require('./myPromiseBabel')

const myPromise = new MyPromise((resolve, reject) => {
  resolve('成功')
})

myPromise.then().then().then(value => console.log(value, 'myPromise')) // 成功 myPromise

const myPromise2 = new MyPromise((resolve, reject) => {
  reject(new Error('失败'))
})

myPromise2.then().then().then(value => {}, reason => {
  console.log(reason.message, 'myPromise2') // 失败 myPromise2
})
