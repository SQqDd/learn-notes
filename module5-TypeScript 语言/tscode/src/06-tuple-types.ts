// 元祖 Tuple

const tuple: [number, string] = [1, 'foo'] // 固定长度

const tuple2: [number, string | number][] = [[1, '2'], [1, '3']]

// 实际上 Object.entries() 返回的是一个元祖类型的数组
Object.entries({
  foo: '123',
  bar: 466
})
