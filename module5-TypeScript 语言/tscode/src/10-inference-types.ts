// 隐式类型推断

export {}

let a = 100 // 此时 ts 隐式推断 a 变量的类型为 number

a = 'foo' // 当赋值 string 类型给 a 的时候，系统会提示错误

let b // 当 ts 无法确定变量 b 的类型时候，会推断为 any

b = 100
b = 'foo' // 此时 b 可以赋值任意类型的值
