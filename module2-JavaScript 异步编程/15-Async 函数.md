# Async 函数
## 代码
```js
function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

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

async function fetch() {
  const res1 = await ajax('/api/user.json')
  console.log(res1)
  const res2 = await ajax('/api/urls.json')
  console.log(res2)
}

const promise = fetch()

console.log(promise) // Promise 对象

promise.then(value => {
  console.log('then start')
})

```

## 总结
- async 函数与 generator 的区别是
- async 函数是 generator 的语法糖
- async 代替 *，await 代替 yield
- async 函数让代码阅读起来更易懂
- 使用 async 不用使用 generator 中 co 的处理器
- 注意：
  - await 只能在 async 函数内部使用
  - async 函数返回的是 Promise 对象，可以链式调用
