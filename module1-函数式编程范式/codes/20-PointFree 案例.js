// i will be back -> I. W. B. B
// split 切割
// Upper
// first
// join
const fp = require('lodash/fp')

const str = 'i will be back'

const f = fp.flowRight(fp.join('. ') ,fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '))

console.log(f(str)) // I. W. B. B

// 上面方法中，对数组进行了两次循环，性能肯定会有所下降
// 使用 flowRight 改造，遍历的时候，让 toUpper 和 first 一起执行
const f1 = fp.flowRight(fp.join('. ') ,fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))

console.log(f1(str)) // I. W. B. B
