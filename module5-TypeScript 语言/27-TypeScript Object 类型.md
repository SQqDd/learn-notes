- TypeScript Object 类型
  - 与 flow 不同，ts 中 object 类型不只是对象，还可以是数组、函数
  - 在 ts 中，定义对象一般用接口

```ts
// TypeScript Object
// object 可以是对象、数组、函数
const foo: object = {}

const bar: object = []

const baz: object = function () {}

// 单独定义对象
const obj1: { foo: string, bar: number } = { foo: '123', bar: 123 }

// const ojb2: { [string]: number } = {} // 没法使用这种方式定义

```
