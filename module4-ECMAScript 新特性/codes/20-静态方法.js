class Person {
  constructor(name) {
    this.name = name
  }

  say() {
    console.log(`my name is ${this.name}`)
  }

  static create(name) {
    // 这里不能使用 this.name，因为是类型去调用 Person.create，而不是实例去调用
    return new Person(name)
  }
}

const p1 = Person.create('zwd')
