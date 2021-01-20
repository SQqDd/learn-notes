- TypeScript 数组类型

```ts
// 数组类型

// 使用 1
const arr1: Array<number> = [1, 2, 3]

// 使用 2 - 最常用
const arr3: number[] = [1, 2, 3]

//
function getSum(...args: number[]) {
  return args.reduce((prev, cur) => prev + cur, 0)
}

getSum(1, 2, 'foo') // 直接提示错误了
getSum(1, 2, 3)

```
