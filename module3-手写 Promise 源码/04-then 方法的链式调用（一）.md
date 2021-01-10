# then 方法的链式调用（一）
## 分析
```js
const MyPromise = require('./myPromiseBabel')

let promise = new MyPromise((resolve, reject) => {
  resolve('成功')
})

promise.then(value => {
  console.log(value)
  return 100
}).then(value => {
  console.log(value) // 100
}).then(value => {
  console.log(value)
})

// promise 中的 then 方法是可以链式调用的
// then 方法拿的是上一个 回调函数的返回值
// 怎么实现
// 链式调用 -> 回调函数返回新的 Promise 对象
// 下一个 then 方法回调的值是上一个 then 方法回调的返回值 -> 新 Promise 对象 resolve(回调的返回结果)

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
    let promise2 = new MyPromise((resolve, reject) => {
      // 之所以搬到这里，是因为执行器里的代码是马上执行的（下面代码需要马上执行）
      if (this.status === FULFILLED) {
        // 成功状态执行 successCallback
        // 获取回调函数的返回结果
        let x = successCallback(this.value)
        // 改变新 Promise 对象的状态
        resolve(x)
      } else if (this.status === REJECTED) {
        // 失败状态执行 failCallback
        failCallback(this.reason)
      } else {
        // pending，将回调函数缓存起来
        this.successCallback.push(successCallback)
        this.failCallback.push(failCallback)
      }
    })

    // if (this.status === FULFILLED) {
    //   // 成功状态执行 successCallback
    //   successCallback(this.value)
    // } else if (this.status === REJECTED) {
    //   // 失败状态执行 failCallback
    //   failCallback(this.reason)
    // } else {
    //   // pending，将回调函数缓存起来
    //   this.successCallback.push(successCallback)
    //   this.failCallback.push(failCallback)
    // }

    return promise2
  }
}

module.exports = MyPromise

```
