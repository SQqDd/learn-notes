# Promise 静态方法
##
- Promise.resolve()
- Promise.reject()

## 代码
```js
// Promise.resolve() 返回一个 Promise 对象
const promise = Promise.resolve('foo')

console.log(promise) // Promise 对象

Promise.resolve('foo') // 返回一个 fulfilled 状态的 Promise 对象
  .then(value => console.log(value)) // foo

Promise.resolve('foo')
// 等价于
new Promise((resolve, reject) => {
  resolve('foo')
})

// Promise.resolve() 接收一个 Promise 对象，返回的也是该 Promise 对象
const promise2 = new Promise((resolve, reject) => {
  resolve('foo')
})

const promise3 = Promise.resolve(promise2)

console.log(promise2 === promise3) // true

// Promise.resolve() 能接收一个带有 then 属性的对象，将 then 方法改造
Promise.resolve({
  then: function (onFulfilled, onRejected) {
    onFulfilled('foo')
  }
}).then(value => console.log(value, 'then')) // foo then

// Promise.reject() 较为简单，直接丢错误对象进去就返回一个 Promise 对象
Promise.reject(new Error('rejected'))
  .catch(err => console.log(err)) // Error: rejected ...

```

## 总结
- Promise.resolve() 返回一个 fulfilled 状态的 Promise 对象
- Promise.resolve() 接收的值会做为该 Promise 对象 onFulfilled 的参数
- Promise.resolve() 接收一个 Promise 对象，返回该 Promise 对象
- Promise.resolve() 接收一个带 then 方法的对象并且带有 onFulfilled、onRejected 的函数，返回的 Promise 对象会使用该 then 方法
- Promise.reject() 简单粗暴，接收错误，并返回一个 rejected 状态的 Promise 对象
