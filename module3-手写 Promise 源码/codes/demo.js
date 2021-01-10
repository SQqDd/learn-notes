const promise = new Promise((resolve, reject) => {
  throw new Error('executor error')
})

promise.then(value => {}, reason => {
  console.log(reason.message)
  return Promise.resolve(1)
}).then(value => {
  console.log(value)
})
