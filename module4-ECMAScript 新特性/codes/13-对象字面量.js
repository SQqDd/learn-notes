// before
const bar = '123'

const foo = {
  bar: bar,
  value: '456',
  method1: function () {
    console.log(this)
  }
}

// 对象字面量
// 对象属性名与变量相等可以省略
// 函数的写法改变
// 计算属性名 - 使用 [] 去添加动态属性
const newFoo = {
  bar,
  value: '456',
  method1() { // 这里的函数是普通函数，不是箭头函数，this 的指向还是看谁去调用
    console.log(this)
  },
  // 计算属性名
  [Math.random()]: '123'
}

console.log(newFoo)
