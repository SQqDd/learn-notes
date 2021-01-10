# Promise 使用案例
## 代码
```js
// promise 实现 ajax
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

ajax('/api/user.json').then(function (res) {
  console.log(res)
}, function (error) {
  console.log(error)
})

ajax('/api/login.json').then(function (res) {
  console.log(res)
}, function (error) {
  console.log(error)
})

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210106101815.png)
