// 程序中不再需要使用的对象
function func() {
  name = 'lg'
  return `${name} is xxx`
}

func() // 程序执行完过后，name 存储的内容不需要再使用，此时可以回收掉

// 程序中不能再访问到的对象
function func2() {
  const age = 23
  return `i am ${age}`
}

func2() // 程序内部声明了一个变量 age，当程序执行完过后，此时外部无法再访问这个变量，此时就可以回收掉
