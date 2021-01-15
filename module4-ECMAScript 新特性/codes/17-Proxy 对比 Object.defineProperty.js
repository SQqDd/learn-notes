// const list = []

// const listProxy = new Proxy(list, {
//   set(target, property, value) {
//     // property 在数组中指下标
//     console.log(target, property, value)
//     target[property] = value
//     console.log('写入成功')
//     return true
//   }
// })

// listProxy.push(100)

// Proxy 优势 ------ 不需要侵入对象
const person = {}

Object.defineProperty(person, 'name', {
  get() {
    console.log('name 被访问')
    return person._name
  },

  set(value) {
    console.log('name 被设置')
    person._name = value
  }
})

Object.defineProperty(person, 'age', {
  get() {
    console.log('age 被访问')
    return person._age
  },

  set(value) {
    console.log('age 被设置')
    person._age = value
  }
})

person.name = 123
person.age = 123

console.log(person.name)

// Proxy 的方式更为合理
const person2 = {
  name: 'ls',
  age: 23
}

const person2Proxy = new Proxy(person2, {
  get(target, property) {
    return target[property]
  },

  set(target, property, value) {
    target[property] = value
  }
})

person2Proxy.age = 24
console.log(person2Proxy.age)
