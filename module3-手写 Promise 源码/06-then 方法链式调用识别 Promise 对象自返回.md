# then 方法链式调用识别 Promise 对象自返回
## 分析
```js
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
        // 同步运行的情况下，promise2 这时候是还没有获取到的。所以要将此步骤放到异步调用里面
        setTimeout(() => {
          // 成功状态执行 successCallback
          // 获取回调函数的返回结果
          let x = successCallback(this.value)
          // 改变新 Promise 对象的状态
          // resolve(x)
          resolvePromise(promise2, x, resolve, reject)
        }, 0);
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

function resolvePromise(promise2, x, resolve, reject) {
  if ( promise2 === x) {
    // 自己返回自己
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }

  if (x instanceof MyPromise) {
    // Promise 对象
    // 拿到 Promise 对象的状态，并去改变返回的 Promise 对象的状态
    // Promise.then(value => resolve(value), reason => reject(reason))
    // 进一步改写
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}

module.exports = MyPromise

```
