# Promise 核心代码逻辑实现
## 代码
```js
/**
 * 1. Promise 是一个类，他接收参数作为函数。这个函数是一个执行器，马上执行
 * 2. Promise 状态有三个， 等待 pending 成功 fulfilled 失败 rejected
 * 3. 执行器上面返回两个参数，分别是 resolve 、reject
 * 4. resolve 将状态改变成 pending -> fulfilled
 * 5. reject 将状态改变成 pending -> rejected
 * 6. Promise 状态一旦改变后无法再改变
 * 7. Promise 原型上有 then 方法，分别返回成功的回调函数（onFulfilled）和失败的回调函数（onRejected）
 * 8. 这两个回调函数会带上成功的结果和失败的原因
 * 9. 这个两个值由执行器的 resolve 和 reject 去接收
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject)

  }

  // 状态保存，初始值 pending
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;

  // 这里用箭头函数是因为外部需要使用到这个函数，如果用普通函数 this 指向 window 或者全局。所以要用箭头函数将 this 指向 Promise 实例
  resolve = value => {
    // 状态一旦改变，无法再进行更改
    if (this.status !== PENDING) return
    // 将状态改成 fulfilled
    this.status = FULFILLED
    this.value = value
  }

  reject = reason => {
    // 状态一旦改变，无法再进行更改
    if (this.status !== PENDING) return
    // 将状态改成 rejected
    this.status = REJECTED
    this.reason = reason
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
    }
  }
}
```
