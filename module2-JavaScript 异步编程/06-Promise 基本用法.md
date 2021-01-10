# Promise 基本用法
## 代码
```js
const promise = new Promise((resolve, reject) => {
  // 这里是用户兑换承诺的逻辑
  console.log('promise start')
  // resolve(100) // 将承诺状态改变成 fulfilled，承诺实现

  reject(new Error('promise rejected')) // 将承诺状态改变成 rejected，承诺失败。传入一个 Error 对象

  // 上面二者只能执行其一
})

promise.then(function onFulfilled(value) {
  console.log('resolved', value)
}, function onRejected(error) {
  console.log('rejected', error)
})

console.log('end')

```

## 分析
- 上面代码输出结果是 promise start -> end -> rejected Error: promise rejected ...
- 为什么是这样呢
- Promise 的回调函数 onFulfilled、onRejected 会被放到消息队列，当前任务执行完过后才会去执行回调函数，所以先输出 end
- 还有 Promise 里面的内部逻辑都是同步任务，只有回调函数才是异步任务
- Promise 用 then 方法接收成功和失败的回调函数
