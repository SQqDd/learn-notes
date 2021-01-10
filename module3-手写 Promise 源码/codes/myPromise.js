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

  // finally 不是静态方法
  // 接收函数作为参数
  // 返回一个 Promise 对象
  finally(callback) {
    // 拿到调用 finally 的 Promise 对象的状态
    return this.then(value => {
      // // 调用回调函数
      // callback()
      // // 返回一个新的 Promise 对象，带上成功的结果

      // 处理异步情况
      // 使用 MyPromise.resolve 去处理
      // 如果回调函数返回的是 Promise 对象，MyPromise.resolve 会直接将它返回
      // 然后调用返回的 Promise 对象的 then 方法，将调用 finally 的 Promise 对象的结果返回出去
      return MyPromise.resolve(callback()).then(() => value)
    }, reason => {
      return MyPromise.resolve(callback()).then(() => { throw reason })
    })
  }

  catch(failCallback) {
    return this.then(undefined, failCallback)
  }

  // Promise.all 是静态方法
  // 接收数组作为参数
  // 返回一个 Promise 对象
  static all(array) {
    const result = [] // 存储返回结果
    let index = 0 // 记录成功存储结果次数，如果 index === array.length 证明都执行完成（处理异步的情况）

    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value
        index++
        if (index === array.length) {
          // 改变状态，并将结果返回出去
          resolve(result)
        }
      }

      // 遍历数组
      for (let i = 0; i < array.length; i++) {
        const current = array[i]

        if (current instanceof MyPromise) {
          // Promise 对象
          // 成功就调用 resolve addData 存储结果，失败就直接 reject 原因
          current.then(value => addData(i, value), reason => reject(reason))
        } else {
          // 普通值
          addData(i, array[i])
        }
      }
    })
  }

  // Promise.resolve 是静态方法
  // 接收值的可以是普通值或者是 Promise 对象
  // 普通值就返回新的 Promise 对象；是 Promise 对象就直接返回
  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise((resolve, reject) => resolve(value))
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
