// @flow

// 指定成员类型
const obj1: { foo: string, bar: number } = { foo: '123', bar: 456 }

// 成员是否可选 ?
const obj2: { foo?: string, bar: number} = { bar: 123 }

// 指定键值对类型，可以任意添加成员
const obj3: { [string]: string } = {}

obj3.value = '123'
obj3.key = '466'
