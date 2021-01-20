// 类的访问修饰符

export {}

class Person {
  // ts 中需要定义构造器属性的类型
  public name: string // public 公有成员，默认是公有成员
  private age: number // private 定义私有属性，只能在类的内部访问，无法在实例中访问
  protected gender: boolean // protected 受保护的，与 private 相似，只能在内部访问，无法在外部访问；与 private 的区别是，gender 可以在子类中访问（允许继承的），而 private 不允许在子类中访问
  protected readonly realName?: string // readonly 只读属性，只读属性必须在声明时或构造函数里被初始化。不能被修改

  constructor(name: string, age: number, realName?: string) {
    this.name = name
    this.age = age
    this.realName = realName
    this.gender = true
  }

  sayHi(msg: string): void {
    console.log(`my name is ${this.name}, ${msg}`)
  }
}

class Student extends Person {
  private constructor(name: string, age: number) {
    super(name, age)
    console.log(this.gender)
  }

  // static 静态属性，可以通过类直接访问，不需要实例化
  static create(name: string, age: number) {
    return new Student(name, age)
  }
}

const john = Student.create('john', 23)
john.sayHi('happy new year')
