// 用方法访问属性
function Person(name, age) {
  this.name = name
  this.age = age
  this.getName = function () {
    return this.name
  }
}

const p1 = new Person('zs', 23)
const name = p1.getName()

// 直接访问属性
function Person(name, age) {
  this.name = name
  this.age = age
}

const p2 = new Person('zs', 23)
const name = p2.name
