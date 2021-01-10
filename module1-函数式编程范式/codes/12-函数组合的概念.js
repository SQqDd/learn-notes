// 将字符串数组中最后一个元素转化成大写字母

// 函数组合
function compose(f3, f2, f1) {
  return function (value) {
    return f3(f2(f1(value)))
  }
}

// 数组反转
function reverse(array) {
  return array.reverse()
}

// 数组第一个元素
function first(array) {
  return array[0]
}

// 字符串转大写
function toUpper(str) {
  return str.toUpperCase()
}

const last = compose(toUpper, first, reverse)

console.log(last(['a', 'b', 'c'])) // C
