function foo(callback) {
  setTimeout(function () {
    console.log('timer invoke')
    callback()
  }, 1000)
}

console.log('global start')

foo(() => {
  console.log('callback invoke')
})()

console.log('global end')
