# catch 方法的实现
## 分析
```js
const promise = new Promise((resolve, reject) => {
  reject('失败')
})

promise.then(value => {
  console.log(value)
}).catch(reason => {
  console.log(reason) // 失败
})

/**
 * 分析
 * catch 方法接收函数作为参数
 * catch 方法返回一个 Promise 对象
 * catch 方法执行的是 reject 失败的回调函数
 * 具体实现
 * 内部其实是调用 this.then(undefined, failCallback)
 */

const MyPromise = require('./myPromiseBabel')

const myPromise = new MyPromise((resolve, reject) => {
  reject('失败')
})

myPromise.then(value => {
  console.log(value)
}).catch(reason => {
  console.log(reason) // 失败
})

```

## 代码
```js
catch(failCallback) {
  return this.then(undefined, failCallback)
}
```
