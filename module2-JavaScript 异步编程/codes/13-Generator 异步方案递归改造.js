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
