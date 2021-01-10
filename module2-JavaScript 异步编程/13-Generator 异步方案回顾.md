# Generator 异步方案
## Generator 回顾
```js
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

```

- 函数名字前明加上一个 *，该函数就会变成生成器
- 想执行代码的内容，就要调用 .next() 方法
- .next() 方法遇到 yield 会暂停，不会往下执行。
- 再调用一次 .next 会继续往下执行，执行到下一个 yield 之前
- .next() 可以接收参数，返回给函数内部的 yield
- 而 yield 也可以定义一个值，外部调用 generator.next() 的时候会返回一个对象 { value: 'yield 定义的值', done: false }
- done 指明当前函数是否执行完，false 未执行完，true 执行完
- .throw 方法可以传入 Error 对象，在函数内部用 try...catch 进行捕获，会执行 catch 中的代码
