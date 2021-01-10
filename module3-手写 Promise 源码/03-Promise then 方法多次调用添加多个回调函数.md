# Promise then 方法多次调用添加多个回调函数
## 分析
```js
const MyPromise = require('./myPromiseBabel')

let myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('成功。。。'), 2000)
  // setTimeout(() => reject('失败。。。'), 2000)
  // resolve('成功')
  // reject('失败')
})

// 一个 promise 的 then 方法可以多次调用，添加多个回调函数
// 在同步的情况下，then 方法都会根据状态 fulfilled 或者 rejected 直接执行传进来的回调函数
// 在异步的情况下就不行了。then 方法在 pending 的状态下，需要将回调函数用数组存储（then 可以多次调用）
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

```

## 代码
```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  // 状态保存，初始值 pending
  status = PENDING
  // 成功之后的值
  value = undefined
  // 失败后的原因
  reason = undefined
  // 成功的回调函数
  successCallback = []
  // 失败的回调函数
  failCallback = []

  // 这里用箭头函数是因为外部需要使用到这个函数，如果用普通函数 this 指向 window 或者全局。所以要用箭头函数将 this 指向 Promise 实例
  resolve = value => {
    // 状态一旦改变，无法再进行更改
    if (this.status !== PENDING) return
    // 将状态改成 fulfilled
    this.status = FULFILLED
    this.value = value
    // 判断成功回调函数是否存在，存在就执行
    // this.successCallback && this.successCallback(this.value)
    while (this.successCallback.length) {
      this.successCallback.shift()(this.value)
    }
  }

  reject = reason => {
    // 状态一旦改变，无法再进行更改
    if (this.status !== PENDING) return
    // 将状态改成 rejected
    this.status = REJECTED
    this.reason = reason
    // 判断失败函数是否存在，存在就执行
    // this.failCallback && this.failCallback(this.reason)
    while (this.failCallback.length) {
      this.failCallback.shift()(this.reason)
    }
  }

  // 这里不用箭头函数，是因为 this 指向 Promise 实例; promise.then()
  // then 接收两个回调函数参数
  then(successCallback, failCallback) {
    if (this.status === FULFILLED) {
      // 成功状态执行 successCallback
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      // 失败状态执行 failCallback
      failCallback(this.reason)
    } else {
      // pending，将回调函数缓存起来
      this.successCallback.push(successCallback)
      this.failCallback.push(failCallback)
    }
  }
}

module.exports = MyPromise

```
