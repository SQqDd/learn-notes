class Person {
  constructor(name) {
    this.name = name
  }

  say() {
    console.log(`my name is ${this.name}`)
  }
}

class Student extends Person {
  constructor(name, number) {
    super(name) // 调用父类，相当于 new Person.call(this, name)
    this.number = number
  }

  hello() {
    super.say() // 可以通过 super 访问到父类的方法
    console.log(`my school number is ${this.number}`)
  }
}

const s1 = new Student('stu', 22)
s1.hello()
// my name is stu
// my school number is 22
