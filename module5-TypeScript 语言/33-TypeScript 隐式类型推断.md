- 隐式类型推断
  - 当没有给变量定义类型的时候，ts 会进行隐式类型推断，自动给变量带上类型
  - 当 ts 无法确定一个变量的类型，会推断为 any

```ts
// 隐式类型推断

export {}

let a = 100 // 此时 ts 隐式推断 a 变量的类型为 number

a = 'foo' // 当赋值 string 类型给 a 的时候，系统会提示错误

let b // 当 ts 无法确定变量 b 的类型时候，会推断为 any

b = 100
b = 'foo' // 此时 b 可以赋值任意类型的值

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210119163156.png)
