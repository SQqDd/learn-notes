# 异常捕获和 then 方法其他状态补全
## 分析
```js
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

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210109160741.png)

## 代码
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
