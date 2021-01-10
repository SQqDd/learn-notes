const _ = require('lodash')

// first/last/toUpper/reverse/each/find/findIndex/includes

const arr = ['mike', 'jack', 'mary', 'john']

console.log(_.first(arr))
console.log(_.last(arr))

console.log(_.toUpper(_.first(arr)))

console.log(_.reverse(arr))

_.each(arr, (item, index) => {
  console.log(item, index)
})

const r = _.find(arr, (item, index) => {
  return item === 'jack'
})

console.log(r)

console.log(_.includes(arr, 'mary'))
