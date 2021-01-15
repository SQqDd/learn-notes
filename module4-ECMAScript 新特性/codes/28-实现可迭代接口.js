// 实现可迭代接口 iterable
const obj = {
  state: [1, 2, 3],

  // iterable 是一个函数
  [Symbol.iterator]: function () {
    // 迭代指针
    let index = 0
    // 当前对象
    let self = this
    // 返回一个 iterator 对象
    return {
      // iterator 对象内部实现了 next 方法
      next: function () {
        const iteration = {
          // iteration 对象有两个值，value 和 done
          value: self.state[index],
          done: index >= self.state.length // done 为 false 的时候，for...of 才会返回
        }
        // 指针下移
        index++
        // next 方法返回 iteration 对象
        return iteration
      }
    }
  }
}

for (const item of obj) {
  console.log(item) // 依次输出 1 2 3
}
