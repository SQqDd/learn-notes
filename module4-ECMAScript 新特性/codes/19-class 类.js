// 传统构造函数
// function Person(name) {
//   this.name = name
// }

// Person.prototype.say = function () {
//   console.log(`my name is ${this.name}`)
// }

// const p1 = new Person('p1')

// class 关键词
class Person {
  constructor(name) {
    this.name = name
  }

  say() {
    console.log(`my name is ${this.name}`)
  }
}

const p1 = new Person('p1')
