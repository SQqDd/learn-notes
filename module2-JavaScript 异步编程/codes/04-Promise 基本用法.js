const promise = new Promise((resolve, reject) => {
  // 这里是用户兑换承诺的逻辑
  console.log('promise start')
  // resolve(100) // 将承诺状态改变成 fulfilled，承诺实现

  reject(new Error('promise rejected')) // 将承诺状态改变成 rejected，承诺失败

  // 上面二者只能执行其一
})

promise.then(function onFulfilled(value) {
  console.log('resolved', value)
}, function onRejected(error) {
  console.log('rejected', error)
})

console.log('end')
