- 类型断言
  - 当 ts 无法明确一个变量的类型的时候，我们可以使用类型断言来告诉 ts 这个变量是什么类型
  - 注意：
    - 类型断言并不是类型转换，类型转换是发生在运行阶段的。
    - 而类型断言只是在编码阶段辅助 ts 识别变量的类型，编译过后断言的代码就会被去掉

```ts
// 类型断言

export {}

//
const nums = [1, 2, 3, 4]

const res = nums.find(v => v > 0) // 此时 ts 推断这里的 res 变量类型是 number | undefined

// const square = res * res // 当我们使用 res 的时候，由于 ts 推断出 res 存在两种类型，所以系统会提示变量可能是 undefined

// 此时可以使用类型断言，人为的断定这个变量只会是 number
// 方式一
const num1 = res as number
const squire = num1 * num1

// 方式二
const num2 = <number>res // JSX 下不能使用，跟 JSX 的标签冲突

```
