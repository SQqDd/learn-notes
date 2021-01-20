- 数组类型
  - Array<number> -> 需要指定泛型（指定元素的类型）
  - number[] -> 表示元素类型都为 number 的数组
  - [string, number] -> 固定长度且类型确定的数组（这种数据类型简称元祖）

```js
// @flow

// 指定泛型
const arr1: Array<number> = [1, 2, 3]

// 类型后面带上 []
const arr2: number[] = [1, 2, 3]

// 元祖
const arr3: [String, number] = ['foo', 1]

```
