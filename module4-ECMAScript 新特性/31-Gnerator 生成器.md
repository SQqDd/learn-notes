# Generator 生成器对象
## 描述
- Generator 生成器对象是由一个 generator function （生成器函数）返回的
- Generator 主要是用来解决回调地狱的问题
- 方法
  - Generator.prototype.next() 返回一个由 yield 表达式生成的值
  - Generator.prototype.return() 返回给定的值并结束生成器
  - Generator.prototype.throw() 向生成器抛出一个错误
- Generator Function 也称为惰性函数，因为要调一下执行一下

## 代码
```js
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

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210114151338.png)
