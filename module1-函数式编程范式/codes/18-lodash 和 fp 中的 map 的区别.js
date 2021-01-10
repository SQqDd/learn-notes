// lodash 和 lodash/fp 中的 map 的区别
// lodash map
const _ = require('lodash')

console.log(_.map(['1', '22', '10'], parseInt)) // [ 1, NaN, 2 ]

const fp = require('lodash/fp')

console.log(fp.map(parseInt)(['1', '22', '10'])) // [ 1, 22, 10 ]
