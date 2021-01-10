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
