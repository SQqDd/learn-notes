// 类与接口

// 一个接口最好对应一个能力，粒度小更容易复用
// 吃的能力（接口）
interface Eat {
  // 接口里只需要约束能力的类型
  eat(food: string): void
}

// 跑的能力
interface Run {
  run(distance: number): void
}

// 使用 implements 实现接口，多个接口用 , 号拼接
class Person implements Eat, Run {
  // 类里面实现接口的具体内容
  eat(food: string) {
    console.log(`eat ${food}`)
  }

  run(distance: number) {
    console.log(`run ${distance}`)
  }
}

class Animal implements Eat, Run {
  eat(food: string) {
    console.log(`eat ${food}`)
  }

  run(distance: number) {
    console.log(`run ${distance}`)
  }
}
