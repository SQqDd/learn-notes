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
