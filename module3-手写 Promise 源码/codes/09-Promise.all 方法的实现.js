function p1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p1')
    }, 0)
  })
}

function p2() {
  return new Promise((resolve, reject) => {
    resolve('p2')
  })
}

Promise.all(['a', 'b', p1(), p2(), 'c'])
  .then(result => {
    console.log(result) // [ 'a', 'b', 'p1', 'p2', 'c' ]
  }, reason => {})

/**
 * 分析
 * Promise.all 是静态方法
 * Promise.all 返回一个 Promise 对象
 * Promise.all 接收数组作为参数
 * 数组的值可以是普通值，可以是 promise 对象
 * 如果状态都是 fulfilled，会在 then 回调返回相同顺序的结果
 * 如果其中一个状态是 rejected，就直接调用失败的函数
 * 注意：如果有异步代码，会等所有异步代码执行完才调用成功的回调函数
 */

const MyPromise = require('./myPromiseBabel')

function p3() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('p3')
    }, 0)
  })
}

function p4() {
  return new MyPromise((resolve, reject) => {
    resolve('p4')
  })
}

MyPromise.all(['a', 'b', p3(), p4(), 'c'])
  .then(result => {
    console.log(result) // [ 'a', 'b', 'p3', 'p4', 'c' ]
  }, reason => {})
