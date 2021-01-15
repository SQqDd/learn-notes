// const name // SyntaxError: Missing initializer in const declaration 声明缺少初始化

// const name = 'zs'
// name = 'ls' // TypeError: Assignment to constant variable. 赋值给常量变量（const 不允许重新赋值）

const obj = {}
obj.name = 'zs'

console.log(obj.name) // zs 对于对象的属性是可以修改的
