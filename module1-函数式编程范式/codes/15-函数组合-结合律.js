const _ = require('lodash')

const f = _.flowRight(_.toUpper, _.first, _.reverse)

console.log(f(['a', 'b', 'c'])) // C

// 先将 first reverse 组合起来，再和 toUpper 组合
const f1 = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse))

console.log(f1(['a', 'b', 'c'])) // C

// 先将 toUpper first 组合起来，再和 reverse 组合
const f2 = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)

console.log(f2(['a', 'b', 'c'])) // C
