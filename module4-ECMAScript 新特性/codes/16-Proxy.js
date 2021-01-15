const person = {
  name: 'mo',
  age: 24
}

const personProxy = new Proxy(person, {
  get(target, property) {
    console.log(target) // { name: 'mo', age: 24 }
    console.log(property) // name
    return property in target ? target[property] : undefined
  },

  set(target, property, value) {
    console.log(value)
    if (property === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError(`${value} is not a int`)
      }
    }

    target[property] = value
  }
})

console.log(personProxy.name) // 触发 get 函数
personProxy.age = 10.12 // 触发 set 函数
