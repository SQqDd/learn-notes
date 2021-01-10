// i will be back -> I-WILL-BE-BACK
const _ = require('lodash')
const str = 'i will be back'

const split = _.curry((reg, sep) => _.split(sep, reg))
const join = _.curry((sep, array) => _.join(array, sep))

const f = _.flowRight(join('-'), _.toUpper, split(' '))

console.log(f(str)) // I-,-W-I-L-L-,-B-E-,-B-A-C-K

// 上面输出结果明显不对的，这时候要怎么排查
// 定义一个 log 日志，接收上一个函数的返回结果并输出，接着将结果返回给下一个函数
const log = value => {
  console.log(value)
  return value
}


const f1 = _.flowRight(join('-'), log, _.toUpper, log, split(' '))

console.log(f1(str))
// 这时候经过排查是 _.toUpper 导致，但是如果有多个函数的情况下，日志查看起来会有点麻烦
// 这时候需要改造 log，接收两个参数，一个是函数的名称，一个是函数返回的结果
const trace = _.curry((tag, value) => {
  console.log(`tag的返回结果：${value}`)
  return value
})

const f2 = _.flowRight(join('-'), trace('toUpper'), _.toUpper, trace('split'), split(' '))

console.log(f2(str))

// 这样就清晰很多了
// 经过修改，正确的写法是
// 由于 toUpper 返回的是格式化之后的字符串，所以要通过 map 循环数组去转大写
const map = _.curry((func, array) => _.map(array, func))

const f3 = _.flowRight(join('-'), map(_.toUpper), split(' '))

console.log(f3(str))
