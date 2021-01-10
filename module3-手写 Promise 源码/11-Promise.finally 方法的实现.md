# Promise.finally 方法的实现
## 分析 1
```js
function p1() {
  return new Promise((resolve, reject) => {
    resolve('p1 resolve')
  })
}

p1().finally(() => {
  console.log('finally') // finally
}).then(value => {
  console.log(value) // p1 resolve
})

/**
 * 分析
 * Promise.finally 方法不是静态方法
 * finally 方法接收一个函数作为参数
 * finally 方法有两个特性
 * 1. 无论 Promise 对象的状态是成功还是失败，都会执行 finally 接收的回调函数
 * 2. finally 接收的回调函数返回一个 Promise 对象。他的状态的结果是上一个 Promise 的状态的结果
 */

const MyPromise = require('./myPromiseBabel')

function p3() {
return new MyPromise((resolve, reject) => {
  // resolve('p3 resolve')
  reject('p3 reject')
})
}

p3().finally(() => {
  console.log('finally') // finally
}).then(value => {
  console.log(value) // p3 resolve
}, reason => {
  console.log(reason)
})


```

## 代码 1
```js
  // finally 不是静态方法
  // 接收函数作为参数
  // 返回一个 Promise 对象
  finally(callback) {
    // 拿到调用 finally 的 Promise 对象的状态
    return this.then(value => {
      // 调用回调函数
      callback()
      // 返回一个新的 Promise 对象，带上成功的结果
      return value
    }, reason => {
      callback()
      throw reason
    })
  }
```

## 分析2
```js
function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('p2')
      resolve('p2 resolve')
    }, 2000)
  })
}

p1().finally(() => {
  console.log('finally2 promise')
  return p2()
}).then(value => {
  console.log(value, 'promise')
})

function p4(params) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      console.log('p4')
      resolve('p4 resolve')
    }, 2000)
  })
}

/**
 * 分析 2
 * Promise.finally 接收的函数如果返回 Promise 对象，里面执行了异步操作。
 * 会等到里面的异步操作执行完，才会去执行 then 方法里的回调函数
 * 解决
 * 处理异步情况
 * 使用 MyPromise.resolve 去处理
 * 如果回调函数返回的是 Promise 对象，MyPromise.resolve 会直接将它返回
 * 然后调用返回的 Promise 对象的 then 方法，将调用 finally 的 Promise 对象的结果返回出去
 * finally 接收的 Promise 对象的结果并不会带到 then 方法的结果中，then 方法的结果指向谁调用 finally 的 Promise
 */

p3().finally(() => {
  console.log('finally2 myPromise') // finally
  return p4()
}).then(value => {
  console.log(value, 'myPromise') // p3 resolve
}, reason => {
  console.log(reason)
})
```

## 代码 2
```js
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
```
