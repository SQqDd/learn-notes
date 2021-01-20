// 运行时才会发现问题 - 强类型会在语法层面上就发现问题，不用等到运行的时候才发现（提高工作量）
const obj = {}

setTimeout(() => {
  obj.foo()
}, 1000);

// 类型不确定导致返回结果错误（参数类型没有限制）
function sum(a, b) {
  return a + b
}

console.log(sum(100, 10))
console.log(sum(100, '10')) // 不是我们想要的理想结果

// 对象属性自动转换字符串 - 操作太骚了，不是每个人都能适应，语法层面上也怪怪的
const props = {}

props[true]

console.log(obj['true'])
