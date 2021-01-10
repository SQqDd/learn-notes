# Generator 异步方案体验
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

// generator 异步方案体验
function * onload() {
  const res1 = yield ajax('/api/user.json')
  console.log(res1)
  const res2 = yield ajax('/api/urls.json')
  console.log(res2)
}

const g = onload()

const result = g.next()

result.value.then(data => {
  const result2 = g.next(data)

  if (result2.done) return

  result2.value.then(data => {
    const result3 = g.next(data)

    if (result3.done) return

    result3.value.then(data => {
      g.next(data)
      // .......
    })
  })
})

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210106163841.png)

## 分析
- 利用 yield 将 Promise 对象返回出去
- 外部调用完 Promise 之后，通过 .next() 方法将结果传递进去
- 然后判断 yield 返回的对象的 done 状态，false 就继续执行，true 就停止执行
- 以此类推，书写上能达到同步的效果
- 而且上面代码能用递归改造

## 递归改造
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


function * fetch() {
  try {
    const res1 = yield ajax('/api/user.json')
    console.log(res1)
    const res2 = yield ajax('/api/urls.json')
    console.log(res2)
  } catch (e) {
    console.log(e)
  }
}

function co(generator) {
  const g = generator()

  function handleResult(result) {
    if (result.done) return

    result.value.then(data => {
      handleResult(g.next(data))
    }, err => {
      g.throw(err)
    })
  }

  handleResult(g.next())
}

co(fetch)

```

## 总结
- generator 将 promise 异步调用拍扁，使得程序更像同步代码。
- 不过后面有了 async/await 代替，generator 使用就变少了
