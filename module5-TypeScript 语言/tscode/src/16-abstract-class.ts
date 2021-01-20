// 抽象类

export {}

abstract class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  eat(food: string) {
    console.log(`eat ${food}`)
  }

  // 抽象方法，不含方法体，具体实现交给子类；子类不会继承抽象方法
  abstract run(distance: number): void
}


//
class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }

  // 抽象方法具体实现
  run(distance: number) {
    console.log(`run ${distance}`)
  }
}

const d = new Dog('AnAn')
d.eat('xxs')
d.run(123)
