const promise = new Promise((resolve, reject) => {
  throw new Error('executor error')
})

promise.then(value => {}, reason => {
  console.log(reason.message) // executor error
})

const promise2 = new Promise((resolve, reject) => {
  resolve('成功')
})

promise2.then(value => {
  console.log(value)
  throw new Error('then error')
}).then(value => {}, reason => {
  console.log(reason.message) // then error
  return 1000
}).then(value => {
  console.log(value) // 1000
  throw new Error('then2 error')
}).then(value => {}, reason => {
  console.log(reason.message) // then2 error
  throw new Error('then2 failCallback error')
}).then(value => {}, reason => {
  console.log(reason.message) // then2 failCallback error
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功 promise3')
  }, 2000);
})

promise3.then(value => {
  console.log(value) // 成功 promise3
  return 3000
}).then(value => {
  console.log(value) // 3000
})

/**
 * 上面代码都是展示原生 promise 对于异常的处理情况还有异步情况下是怎么运行的
 * 执行器阶段进行了异常捕获
 * 回调函数阶段进行了异常捕获，并调用返回的 promise 对象的 reject
 * 异步情况下同理
 */

 const MyPromise = require('./myPromiseBabel')

const myPromise = new MyPromise((resolve, reject) => {
  throw new Error('executor error')
})

myPromise.then(value => {}, reason => {
  console.log(reason.message) // executor error
})

const myPromise2 = new MyPromise((resolve, reject) => {
  resolve('成功')
})

myPromise2.then(value => {
  console.log(value, 'myPromise2')
  throw new Error('then error')
}).then(value => {}, reason => {
  console.log(reason.message) // then error
  return 1000
}).then(value => {
  console.log(value) // 1000
  throw new Error('then2 error')
}).then(value => {}, reason => {
  console.log(reason.message) // then2 error
  throw new Error('then2 failCallback error')
}).then(value => {}, reason => {
  console.log(reason.message) // then2 failCallback error
})

const myPromise3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功 myPromise3')
  }, 2000);
})

myPromise3.then(value => {
  console.log(value) // 成功 myPromise3
  return 3000
}).then(value => {
  console.log(value) // 3000
})
