// before
function foo() {
  console.log(arguments)
}

foo(1, 2, 3) // [Arguments] { '0': 1, '1': 2, '2': 3 }

// after
// 使用 ... 接收剩余参数
// 返回数组的格式，代替以前用 arguments 去接收多个参数
function toDo(...args) {
  console.log(args)
}

toDo(1, 2, 3) // [ 1, 2, 3 ]

/**
 * 注意：
 * ...args 只能在函数的参数最后一个位置用，而且只能用一次
 */

function bar(num, ...args) {
  console.log(num)
  console.log(args)
}

bar(1, 2, 3) // num --> 1; args --> [2, 3]
