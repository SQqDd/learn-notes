// // before
// if (true) {
//   var a = 100
//   console.log(a) // 100
// }

// if (true) {
//   console.log(a) // 100
// }

// // after
// if (true) {
//   let b = 200
//   console.log(b)
// }

// if (true) {
//   console.log(b)
// }


// // before
// // 最常见的问题，事件绑定
// const elements = [{}, {}, {}]
// for (var i = 0; i < elements.length; i++) {
//   elements[i].onClick = function () {
//     console.log(i, 'elements')
//   }
// }

// elements[2].onClick() // 3，结果之所以是 3，是因为函数里面访问的是 i 的最终结果

// // 以前的解决办法是 - 闭包，利用闭包的特性，函数销毁后，访问的变量保存到堆中
// const elements1 = [{}, {}, {}]
// for (var i = 0; i < elements1.length; i++) {
//   elements1[i].onClick = (function (val) {
//     return function () {
//       console.log(val, 'elements1')
//     }
//   })(i)
// }

// elements1[2].onClick() // 2

// // after 现在有了块级作用域和 let 就不一样了
// const elements3 = [{}, {}, {}]
// for (let i = 0; i < elements3.length; i++) {
//   elements3[i].onClick = function () {
//     console.log(i, 'elements2')
//   }
// }

// elements3[2].onClick() // 2


// // var 全局提升 全局声明 重复声明
// console.log(a) // undefined 输出 undefined 是因为 var 使变量提升，但是还没有赋值，所以输出 undefined
// var a = 100

// if (true) {
//   var b = 200 // 全局声明，提升为全局变量
// }

// var a = 300
// console.log(a) // 300 var 的变量可以重复声明

// console.log(b)

// // let 不会变量提升，全局绑定和重复声明
// // console.log(x)
// // let x = 100 // x is not defined - 不能变量提升

// // if (true) {
// //   let y = 200
// // }

// // console.log(y) // y is not defined - 不能全局绑定

// let x = 100
// let x = 200 // Identifier 'x' has already been declared - 不能重复声明

for (let i = 0; i < 3; i++) {
  let i = 'foo'
  console.log(i)
}

// 上面循环输出三个 foo
/**
 * 在 for 循环中，使用 let 声明变量会单独创建一个作用域
 * 这里的执行可以拆分成下面的代码
 */

{
  let i = 0

  if (i < 3) {
    let i = 'foo'
    console.log(i) // 每次都是访问当前作用域的 i
  }

  i++

  if (i < 3) {
    let i = 'foo'
    console.log(i)
  }

  i++

  if (i < 3) {
    let i = 'foo'
    console.log(i)
  }

  i++
}

// 块级作用域中，一个变量用 let 声明，只能声明一次，不能重复声明，但是在别的作用域可以重新声明该变量

{
  let x = 'x'

  {
    console.log(x) // x
  }
}
// 还有一点， JS 执行中，在当前作用域访问不到该变量，会一直往上一个作用域寻找，直至全局作用域为止
