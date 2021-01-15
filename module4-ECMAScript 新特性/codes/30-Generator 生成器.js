// 函数名字之前加上 * 号就是 Generator Function
function * foo() {
  console.log('1111')
  yield 100
  console.log(2222)
  yield 200
  console.log(3333)
  yield 300
}

// 执行 Generator Function 返回一个 Generator，此时函数里面的内容还没有执行
const generator = foo()
console.log(generator) // Object [Generator] {}
// 调用 Generator.prototype.next() 执行函数里面的内容
const res1 = generator.next() // { value: 100, done: false }
// 此时遇到 yield 就会停止往下执行，直至下一个 next 开始。next 返回的对象 value 会带上 yield 后面的值
// 如果没有就是 undefined， done: false 代表函数还没有执行完
// 继续往下执行
const res2 = generator.next()
console.log(res2) // { value: 200, done: false }
// 继续往下执行
const res3 = generator.next()
console.log(res3) // { value: 300, done: false }
const res4 = generator.next()
console.log(res4) // { value: undefined, done: true }
// 直至返回 done: true，代表函数已经执行完毕
// 对象中的 value 存储函数的返回值，因为上面函数没有返回值，所以是 value: undefined
