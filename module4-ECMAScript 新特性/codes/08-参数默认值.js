function foo(enabled = false) {
  // 传统做法
  // enabled = enabled === undefined ? false : true
  console.log(enabled)
}

foo() // false
foo(true) // true
