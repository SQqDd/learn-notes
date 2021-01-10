// generator 回顾
function * foo() {
  try {
    console.log('start')
    const res = yield
    console.log(res)
    const res2 = yield
    console.log(3)
    const res3 = yield 'foo'
    console.log(res3)
  } catch (e) {
    console.log(e)
  }
}

const generator = foo()

// generator.next() // start
generator.next() //start
// yield 的作用是用来暂停函数的执行
// 当 next 再次调用的时候就会执行 yield 下面的代码
generator.next(2) // 2
const result = generator.next(3) // 3
console.log(result) // { value: 'foo', done: false }
// const result2 = generator.next()
// console.log(result2) // { value: undefined, done: true }
generator.throw(new Error('Generator error'))
