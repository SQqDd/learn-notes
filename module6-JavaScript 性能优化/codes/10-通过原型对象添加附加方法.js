// 构造函数内部添加方法
function Fn1() {
  this.foo = () => {
    console.log('do something')
  }
}

const f1 = new Fn1()

// 构造函数原型对象上添加方法
function Fn2() {}

Fn2.prototype.foo = function () {
  console.log('do something')
}

const f2 = new Fn2()
