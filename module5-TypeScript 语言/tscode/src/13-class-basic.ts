// 类 class

export {}

class Person {
  // ts 中需要定义构造器属性的类型
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  sayHi(msg: string): void {
    console.log(`my name is ${this.name}`)
  }
}
