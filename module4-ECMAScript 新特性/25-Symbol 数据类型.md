# Symbol 数据类型
## 描述
- Symbol 是全新的数据类型 --- typeof Symbol() ---> symbol
- Symbol 是一种基本数据类型
- Symbol() 函数会返回 symbol 类型的值，该类型具有静态属性和静态方法
- 他的静态属性会暴露出几个内建的成员对象
- 他的静态方法会暴露全局的 symbol 注册，且类似于内建对象类，但作为构造函数来说他并不完整，因为他不支持语法“new Symbol()”
- 每个从 Symbol() 返回的 symbol 值都是唯一的。一个 symbol 值能作为对象属性的标识符
- 这是该数据类型仅有的目的（无法添加重复的属性，symbol 可以让对象的属性变成私有变量）
- 因为 symbol 是唯一的
- Symbol 的出现，可以防止第三方库被修改，覆盖掉原来的属性

## 代码
```js
// Symbol() 出来的值是唯一的 ，为了方便调试，可以往 Symbol(string) 传入一个字符串（描述文本）去区分
const s1 = Symbol()
const s2 = Symbol()
const s3 = Symbol('s3')
const s4 = Symbol('s4')
console.log(s1, s3) // Symbol() Symbol(s3)
console.log(Symbol() === Symbol()) // false
console.log(Symbol('s') === Symbol('s')) // false

// obj 除了用字符串作为键，还可以用 symbol 值作为键
const obj = {
  [Symbol()]: 123,
  [Symbol()]: 456
}

console.log(obj) // { [Symbol()]: 123, [Symbol()]: 456 }

// 应用场景，Symbol 作为 key 可以使对象的属性值是唯一的
// 假如 cache 是一个缓存对象，有多个文件访问。a 文件用 Symbol 往缓存添加了一个值，这时候只有 a 文件可以访问修改。
// b 文件没法访问修改，因为 b 文件没法获取到键的 symbol 值，除非 a 文件将该值共享给 b 文件。
// 而且 b 文件也不能重复添加一样的值，因为 symbol 是唯一的


// symbol 能作为对象的私有属性，外部没法访问
// a 文件
const name = Symbol()
const person = {
  [name]: 'zwd',
  say() {
    console.log(`my name is ${this[name]}`)
  }
}

// b 文件
// 此时 b 文件不能通过 person[Symbol()] 直接访问到 name 属性
// 只能通过 person.say 间接输出 name 属性
person.say()

// Symbol 的出现，可以防止第三方库被修改，覆盖掉原来的属性

```

##
