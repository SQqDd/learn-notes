- 函数类型
  - 函数有两种写法
    - 函数声明
    - 函数表达式

```ts
// 函数类型

export {}

// 函数声明
// 形参后面加个 ? 变为可选参数
// 当参数有默认值的时候，也是可选参数
function func1 (a: number, b: number = 10, c?: number, ...rest: number[]): string {
  return 'func1'
}

func1(10)
func1(10, 10, 20)
func1(10, 10, 20, 30)

// 函数表达式
const func2 = function (a: number, b: number): string {
  return 'func2'
}

// 当函数表达式的变量作为参数的时候，是要定义变量类型的
// 使用箭头表达式来定义变量类型
const func3: (a: number, b: number) => string = function (a: number, b: number): string {
  return 'func3'
}

```
