// 对象解构的用法
const obj = {
  name: 'zs',
  year: 23
}

// 解构
// const { name, year } = obj
// console.log(name, year) // zs 23

// 如果当前作用域遇到一样命名的变量，可以使用重命名的方法，否则系统会报错
// const name = 'ls'
// const { name: otherName = 'default value' } = obj

// console.log(otherName) // zs

// 多重解构
const data = {
  value: '123',

  others: {
    year: '2222'
  }
}

const { value, others: { year } } = data
console.log(value) // 123
console.log(year) // 2222

// 可以将方法解构出来使用，代码更简洁了
const { log } = console

log('123')
log('123')
