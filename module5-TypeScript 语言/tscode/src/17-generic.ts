// 泛型 generic

// 实现一个函数，返回一个指定长度和内容的数组
function createNumberArray(length: number, value: number): number[] {
  return Array(length).fill(value)
}

function createStringArray(length: number, value: string): string[] {
  return Array(length).fill(value)
}

// 上面两个函数冗余度很高，都是返回一个指定长度和内容的数组；由于我们在调用前无法确定参数的类型和返回值的类型
// 此时可以使用泛型参数

// T 是指类型参数，在调用的时候去确定
function createArray<T>(length: number, value: T): T[] {
  return Array(length).fill(value)
}

// 在调用的时候传递类型参数
const arr = createArray<string>(3, 'xxx')
