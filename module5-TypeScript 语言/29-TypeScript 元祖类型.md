- 元祖类型（Tuple）
  - 数组中元素的数据类型一般是相同的，如果存储的元素数据类型不同，则需要使用元祖。
  - 元祖中允许存储不同类型的元素，元祖可以作为参数传递给函数
  - 

```ts
// 元祖 Tuple

const tuple: [number, string] = [1, 'foo'] // 固定长度

const tuple2: [number, string | number][] = [[1, '2'], [1, '3']]

// 实际上 Object.entries() 返回的是一个元祖类型的数组
Object.entries({
  foo: '123',
  bar: 466
})

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210119145353.png)
