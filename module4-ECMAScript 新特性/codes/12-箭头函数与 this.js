const foo = {
  name: 'zs',
  sayHi() {
    console.log(`${this.name} say hi`)
  },
  sayHello: () => {
    console.log(`${this.name} say hello`)
  },
  eat() {
    setTimeout(function () {
      console.log(`${this.name} eat`)
    }, 0)
  },
  newEat() {
    setTimeout(() => {
      // 此时箭头函数中的 this 指向了谁创建他的当前作用域里的 this
      console.log(`${this.name} eat`)
    }, 0)
  }
}

foo.sayHi() // zs say hi
foo.sayHello() // undefined say hello
foo.eat() // undefined eat
// 因为 setTimeout 的 this 指向全局，这时候没法获取到正常值，可以使用箭头函数
foo.newEat() // zs eat
