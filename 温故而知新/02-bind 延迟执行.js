function sum(a, b, c) {
  return a + b + c
}

const bindSum = sum.bind(this, 1)
console.log(bindSum(2, 3))

// bind 也有柯里化的效果
// 现在模拟下 bind 的实现
/**
 * bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数
 * 而其余参数将作为新函数的参数，供调用时使用
 */
Function.prototype.myBind = function (context, ...args) {
  return (...rest) => this.call(context, ...args.concat(rest))
}

const myBindSum = sum.myBind(this, 1)
console.log(myBindSum(2, 3))
