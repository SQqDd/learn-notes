function p1() {
  return new Promise((resolve, reject) => {
    resolve('p1')
  })
}

Promise.resolve(100).then(value => console.log(value)) // 100
Promise.resolve(p1()).then(value => console.log(value)) // p1

/**
 * 分析
 * Promise.resolve 是一个静态方法
 * Promise.resolve 方法接收参数可以为值或者是 Promise 对象
 * Promise.resolve 返回一个 Promise 对象
 * 判断接收值的类型，Promise 对象直接返回；不是的返回新的 Promise 对象，使用 resolve 改变状态
 */
const MyPromise = require('./myPromiseBabel')

function p2() {
  return new MyPromise((resolve, reject) => {
    resolve('p2')
  })
}

MyPromise.resolve(100).then(value => console.log(value)) // 100
MyPromise.resolve(p2()).then(value => console.log(value)) // p2
