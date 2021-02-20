function fn() {
  const obj1 = {}
  const obj2 = {}

  obj1.name = obj2
  obj2.name = obj1
}

fn()

// fn 执行完的时候，obj1 和 obj2 的数据引用计数理应为 0
// 由于 obj1 引用了 obj2，obj2 引用了 obj2
// 此时他们的引用计数为 1
// 这就导致引用计数算法无法回收
