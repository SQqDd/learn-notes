# Promise 异步情况处理
## 分析
```js
const MyPromise = require('./myPromiseBabel')

let myPromise = new MyPromise((resolve, reject) => {
  // 当我们在 promise 执行器处理期间，用异步任务去调用 resolve 改变状态
  // 我们直接调用 then 方法的时候，此时状态还是 pending。成功回调函数无法执行
  // 解决办法：then 方法调用的时候状态还是 pending 就将回调函数存储起来
  // 然后执行 resolve 、 reject 的时候判断回调函数是否存在，存在就执行
  setTimeout(() => resolve('成功'), 2000)
  // reject('失败')
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
  successCallback = undefined
  // 失败的回调函数
  failCallback = undefined

  // 这里用箭头函数是因为外部需要使用到这个函数，如果用普通函数 this 指向 window 或者全局。所以要用箭头函数将 this 指向 Promise 实例
  resolve = value => {
    // 状态一旦改变，无法再进行更改
    if (this.status !== PENDING) return
    // 将状态改成 fulfilled
    this.status = FULFILLED
    this.value = value
    // 判断成功回调函数是否存在，存在就执行
    this.successCallback && this.successCallback(this.value)
  }

  reject = reason => {
    // 状态一旦改变，无法再进行更改
    if (this.status !== PENDING) return
    // 将状态改成 rejected
    this.status = REJECTED
    this.reason = reason
    // 判断失败函数是否存在，存在就执行
    this.failCallback && this.failCallback(this.reason)
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
      this.successCallback = successCallback
      this.failCallback = failCallback
    }
  }
}

module.exports = MyPromise

````
