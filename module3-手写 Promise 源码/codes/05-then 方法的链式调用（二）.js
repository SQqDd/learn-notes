const MyPromise = require('./myPromiseBabel')

let promise = new MyPromise((resolve, reject) => {
  resolve('成功')
})

let other = function () {
  return new MyPromise((resolve, reject) => {
    resolve('other success')
  })
}

promise.then(value => {
  console.log(value)
  // return 100
  return other()
}).then(value => {
  console.log(value) // 100
}).then(value => {
  console.log(value)
})

// Promise.resolve('1')
//   .then(value => {
//     console.log(value)
//     return Promise.resolve('2')
//   })
//   .then(value => {
//     console.log(value)
//   })

// then 返回的回调函数除了可以返回普通值，还能返回 Promise 对象
// 由于 then 回调本身要返回新的 Promise 对象
// 所以要先判断接收的返回值是否为 Promise 对象
// 如果是 Promise 对象，拿到 Promise 对象的状态，成功就调用新 Promise 对象的 resolve 去改变状态，失败就调用新 Promise 对象的 reject 去改变状态
