- TypeScript 原始类型
  - string
  - number
  - boolean
  - void
  - null
  - undefined
  - symbol
  - 与 flow 不同的是，定义原始类型的变量允许赋值为 null 和 undefined（ps：严格模式下不生效 strict: true）

```ts
const a: string = 'foo'

const b: number = 123 // NaN  Infinity

const c: boolean = true // false

// 非严格模式下，可以赋值 null 和 undefined
// const d: boolean = null

const e: void = undefined // 非严格模式下可以赋值 null

const f: null = null

const g: undefined = undefined

const h: symbol = Symbol()

```
