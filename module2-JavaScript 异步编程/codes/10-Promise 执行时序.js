// 宏任务/微任务
console.log('start')

setTimeout(() => console.log('setTimeout'), 0)

Promise.resolve(1)
  .then(value => {
    console.log('Promise1')
  })
  .then(value => {
    console.log('Promise2')
  })
  .then(value => {
    console.log('Promise3')
  })
  .then(value => {
    console.log('Promise4')
  })

console.log('end')
