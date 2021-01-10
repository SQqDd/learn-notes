# Promise 并行执行
## 方法
- Promise.all()
- Promise.race()

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


// Promise.all() 接收一个 Promise 对象数组，并返回一个 Promise 对象；
// 当全部 Promise 数组对象状态都变成 fulfilled 之后，就执行 then 方法的 onFulfilled 回调函数，接收参数是 Promise 数组对象返回值组成的数组
const promise = Promise.all([
  ajax('/api/user.json'),
  ajax('/api/urls.json')
])

promise.then(value => {
  console.log(value)
})

// 其实可以通过 JSON 配置来执行多个任务
ajax('/api/urls.json')
  .then(value => {
    const urls = Object.values(value)
    const tasks = urls.map(url => ajax(url))

    return Promise.all(tasks)
  })
  .then(values => {
    console.log(values)
  })

// Promise.race() 与 Promise.all() 相反；
// race 是指当第一个异步任务执行完之后就执行 onFulfilled 回调函数
// 使用 race 来实现网络超时
const promise2 = ajax('/api/user.json')

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('timeout')), 500)
})

Promise.race([promise2, promise3])
  .then(value => {
    console.log(value, 'race')
  })
  .catch(err => {
    console.log(err, 'race')
  })

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210106142734.png)

## 总结
- Promise.all() 和 Promise.race() 都可以并行异步任务
- Promise.all() 和 Promise.race() 接收参数都是 Promise 对象数组
- Promise.all() 是所有异步任务执行完才会调用 onFulfilled
- Promise.race() 当第一个异步任务执行完就马上调用 onFulfilled，不管其他任务
