// 重构更牢靠
const utils = {
  aaa: () => {
    console.log('aaa util')
  }
}

// 几个月后修改 aaa 变量名
// 弱类型中，其他地方如果引用只能在执行的时候发现问题
// 强类型中，可以在编译过程中发现问题，并且可以使用一些工具修改使用了该变量的地方


// 减少不必要的类型检查
function sum(a, b) {
  // 弱类型中需要做类型检查
  // 强类型中可以减少这些代码
  if (typeof a !== 'number' && typeof b !== 'number') {
    throw new Error('a or b is not a number')
  }
}
