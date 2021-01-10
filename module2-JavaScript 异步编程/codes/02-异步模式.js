console.log('global start')

setTimeout(function () {
  console.log('timer1 invoke')
}, 1800)

setTimeout(function () {
  console.log('timer2 invoke')

  setTimeout(() => {
    console.log('timer3 invoke')
  }, 1000);
}, 1000)

console.log('global end')
