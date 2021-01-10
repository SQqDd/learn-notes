console.log('global start')

function foo() {
  console.log('foo')
  bar()
}

function bar() {
  console.log('bar')
}

foo()

console.log('global end')
