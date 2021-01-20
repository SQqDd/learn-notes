// @flow

// 参数不是函数
// 标明参数类型和返回值类型
function foo(a: number, b: number): number {
  return a + b
}

// 参数是函数 -> 回调函数
// 括号标明接收参数类型 string 和 number， => 后标明返回值类型 undefined
function bar(callback: (string, number) => void) {
  // todo something
}
