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
