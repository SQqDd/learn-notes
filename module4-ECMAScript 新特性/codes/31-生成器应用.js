// Generator 应用
// 应用 1 - 发号器
function * idGenerator() {
  let id = 0

  while (true) {
    yield id++
  }
}

const idMaker = idGenerator()
console.log(idMaker.next().value) // 0
console.log(idMaker.next().value) // 1
console.log(idMaker.next().value) // 2
console.log(idMaker.next().value) // 3


// 应用 2 - 使用 Generator 函数实现 iterator 方法
// iterator 内部也是实现了 next 方法
const todos = {
  learn: ['html', 'javascript', 'css'],
  daily: ['sleep', 'eat', 'run'],

  // [Symbol.iterator]: function () {
  //   // 初始化集合
  //   const list = [...this.learn, ...this.daily]
  //   // 记录当前访问索引
  //   let index = 0
  //   // 返回一个迭代器对象
  //   return {
  //     // 实现 next 方法
  //     next: function () {
  //       let done = index >= list.length
  //       let value = !done ? list[index++] : undefined

  //       return {
  //         value,
  //         done
  //       }
  //     }
  //   }
  // }

  [Symbol.iterator]: function * () {
    const list = [...this.learn, ...this.daily]

    for (const item of list) {
      yield item
    }
  }
}

for (const item of todos) {
  console.log(item)
}
