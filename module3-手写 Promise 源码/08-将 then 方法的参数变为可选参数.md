# 将 then 方法的参数变为可选参数
## 分析
```js
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

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210109163516.png)

## 代码`
```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      // 遇到异常将状态改变为 rejected
      this.reject(e)
    }
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
      // this.successCallback.shift()(this.value)
      this.successCallback.shift()()
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
      // this.failCallback.shift()(this.reason)
      this.failCallback.shift()()
    }
  }

  // 这里不用箭头函数，是因为 this 指向 Promise 实例; promise.then()
  // then 接收两个回调函数参数
  then(successCallback, failCallback) {
    // 判断是否有参数
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => { throw reason }

    let promise2 = new MyPromise((resolve, reject) => {
      // 之所以搬到这里，是因为执行器里的代码是马上执行的（下面代码需要马上执行）
      if (this.status === FULFILLED) {
        // 同步运行的情况下，promise2 这时候是还没有获取到的。所以要将此步骤放到异步调用里面
        setTimeout(() => {
          try {
            // 成功状态执行 successCallback
            // 获取回调函数的返回结果
            let x = successCallback(this.value)
            // 改变新 Promise 对象的状态
            // resolve(x)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      } else if (this.status === REJECTED) {
        // // 失败状态执行 failCallback
        // failCallback(this.reason)
        // 同步运行的情况下，promise2 这时候是还没有获取到的。所以要将此步骤放到异步调用里面
        setTimeout(() => {
          try {
            // 成功状态执行 successCallback
            // 获取回调函数的返回结果
            let x = failCallback(this.reason)
            // 改变新 Promise 对象的状态
            // resolve(x)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      } else {
        // pending，将回调函数缓存起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              // 成功状态执行 successCallback
              // 获取回调函数的返回结果
              let x = successCallback(this.value)
              // 改变新 Promise 对象的状态
              // resolve(x)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              // 成功状态执行 failCallback
              // 获取回调函数的返回结果
              let x = failCallback(this.reason)
              // 改变新 Promise 对象的状态
              // resolve(x)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
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
