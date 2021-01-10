const MyPromise = require('./myPromiseBabel')

let myPromise = new MyPromise((resolve, reject) => {
  // 当我们在 promise 执行器处理期间，用异步任务去调用 resolve 改变状态
  // 我们直接调用 then 方法的时候，此时状态还是 pending。成功回调函数无法执行
  // 解决办法：then 方法调用的时候状态还是 pending 就将回调函数存储起来
  // 然后执行 resolve 、 reject 的时候判断回调函数是否存在，存在就执行
  setTimeout(() => resolve('成功'), 2000)
  // reject('失败')
})

myPromise.then(value => {
  console.log(value, 'myPromise')
}, reason => {
  console.log(reason, 'myPromise')
})
