const _ = require('lodash')

function getSum(a, b, c) {
  return a + b + c
}

const curried = _.curry(getSum)

console.log(curried(1, 2, 3)) // 6
console.log(curried(1)) // Function
console.log(curried(1)(2, 3)) // 6
console.log(curried(1)(2)) // Function
console.log(curried(1)(2)(3)) // 6
