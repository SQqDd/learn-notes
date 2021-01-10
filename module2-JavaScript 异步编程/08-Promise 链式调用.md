# Promise 链式调用
## 代码
```js
function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url)
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

// const promise = ajax('/api/user.json').then(function (value) {
//   console.log(value)
// })

// const promise2 = promise.then(value => {
//   console.log(222)
// })

// console.log(promise === promise2) // false

// 链式调用
ajax('/api/user.json').then(function (value) {
  console.log(value, 111) // json 111
}).then(value => {
  console.log(value, 222) // undefined 222
  return ajax('/api/urls.json')
}).then(value => {
  console.log(value, 333) // json 333
  return 'foo'
}).then(value => {
  console.log(value, 444) // foo 444
}).then(value => {
  console.log(value, 555) // undefined 555
})

```
![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210106105448.png)

## 分析
- then 方法返回一个新的 promise 对象，promise !== promise2
- 当回调函数没有 return 的时候，下一个 then 方法接收的回调函数的参数值为 undefined
- 当回调函数 return 值的时候，下一个 then 方法的回调函数的参数就是该值
- 当回调函数 return promise 的时候，下一个 then 方法就是这个 promise 的 then 方法，里面的回调都是处理这个 promise 的

## 总结
- Promise 对象的 then 方法返回一个全新的 Promise 对象（不同于其他链式调用，为什么要返回全新的，因为 Promise 结束之后状态无法改变，返回旧的也没乱用，已经处理完了）
- 后面的 then 方法就是在为上一个 then 返回的 Promise 对象注册的
- 前面 then 方法中回调函数的返回值作为后面 then 方法回调的参数
- 如果回调中返回的是 Promise，那后面 then 方法的回调会等待他的结束
