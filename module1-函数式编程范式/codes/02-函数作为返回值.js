// 实现一个函数，只能调用一次
// 用到闭包的原理
function once(fn) {
  let done = false

  return function () {
    if (!done) {
      done = true
      return fn.apply(this, arguments)
    }
  }
}

const pay = once((money) => {
  console.log(`支付：${money} RMB`)
})

const get = once((money) => {
  console.log(`得到：${money} RMB`)
})

pay(5)
pay(5)
get(6)
get(6)
