- 抽象类
  - 抽象类作为其他派生类的基类使用。一般不会被直接实例化
  - 不同于接口，抽象类可以包含成员的具体实现
  - ``` abstract ``` 关键字用于定义抽象类和在抽象类内部定义抽象方法
  - 简单来说，抽象类是一个大类，让一个具体类去继承

```ts
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

```
