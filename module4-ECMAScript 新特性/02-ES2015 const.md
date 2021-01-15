# const
## 描述
与 let 的区别是，多了一个只读属性，其余一样。const 声明的变量是常量，声明的时候一定要进行赋值，而且 const 声明的变量后续是不能修改的。（普通值，对象的内存地址不允许修改，不过对象里的属性值可以修改）

## 代码
```js
// const name // SyntaxError: Missing initializer in const declaration 声明缺少初始化

// const name = 'zs'
// name = 'ls' // TypeError: Assignment to constant variable. 赋值给常量变量（const 不允许重新赋值）

const obj = {}
obj.name = 'zs'

console.log(obj.name) // zs 对于对象的属性是可以修改的


```

## 实践
在实际开发中，不用 var，用 let 和 const。成员不被修改就用 const，如果后续代码要修改到就用 let
