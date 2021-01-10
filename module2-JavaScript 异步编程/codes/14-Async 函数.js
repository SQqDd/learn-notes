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
