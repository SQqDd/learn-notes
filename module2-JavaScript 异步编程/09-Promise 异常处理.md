# Promise 异常处理
## 代码
```js
// promise 实现 ajax
function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // foo()
    // throw new Error('promise error')
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function () {
      // 请求成功后处理
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send() // 发送请求
  })
}


// promise 会将代码异常和人为抛错都放到 onRejected 中去执行
// promise 异常处理有两种方式，一种是 then 方法里传入 onRejected 回调函数；一种是 catch 方法传入 onRejected 回调函数
// 这两种方法有什么区别？
// 看代码
ajax('/api/user.json')
  .then(res => {})
  .catch(err => {})
// 等价于
ajax('/api/user.json')
  .then(res => {})
  .then(undefined, err => {})


// 案例 1
// 1 - 1
ajax('/api/user.json')
  .then(res => {
    foo()
    return ajax('/api/urls.json')
  }, function onRejected(error) {
    console.log(error, 'error1')
  })
  .then(res => {
    console.log(res)
  })

// 1 - 2
ajax('/api/user.json')
  .then(res => {
    foo()
  })
  .catch(error => {
    console.log(error, 'error2')
  })

// 案例 2
// 2 - 1
ajax('/api/user.json')
  .then(function (res) {
    return ajax('/api/error.json') // 错误代码
  }, function onRejected(error) {
    console.log(error, 'error3') // 没有执行
  })

// 2 - 2
ajax('/api/user.json')
  .then(res => {
    return ajax('/api/error.json')
  })
  .catch(error => {
    console.log(error, 'error4') // 执行了
  })

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210106111922.png)

## 分析
- 1 - 1 中，在第一个 promise 成功回调放了个代码错误，并返回一个新的 promise，当前 promise 失败回调中没有捕获到，而是程序直接报错
- 1 - 2 中，使用同样的操作，只不过是使用 catch 调用 onRejected 函数，这次捕捉到了错误
- 2 - 1 和 2 - 2 也是类似于这样的操作。最终都只有 .catch 执行了 onRejected 函数
- 上面代码中 .catch 都是指向上一个 then 返回的 全新的 promise，但是他接收了上一个 promise 的错误
- 而在上一个 promise 中， then 方法中的 onRejected 都没有捕捉到错误
- 由此可见，在 Promise 链中，代码的错误最终都沿着链条丢到 catch 方法中
- 所以如果是链式调用的话，还是用 catch 去处理异常
- 普通 promise 调用可以选择 then 方法或者 catch 方法去处理

## 总结
- catch 方法会捕捉到他之前的所有 promise 的错误
- then 方法中的 onRejected 只会捕获到当前 promise 状态改变之前的错误
- 链式调用使用 catch 去捕捉
- 普通调用 catch then 去捕捉都行
