- 任意类型
  - any 可以输入任何类型的数据

```ts
// 任意类型

export {}

function stringify(value: any) {
  return JSON.stringify(value)
}

stringify('string')
stringify(100)
stringify(true)

```
