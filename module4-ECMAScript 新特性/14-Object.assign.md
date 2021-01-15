# Object.assign
## 描述
- Object.assign 将源对象合并到目标对象，源对象与目标对象有相同属性名，源对象的属性值就覆盖目标对象的属性值
- Object.assign 接收的参数不限制；第一个是目标对象，之后的都是源对象
- Object.assign 的返回结果是目标对象，合并的同时也会将目标对象给改变了
- 注意：Object.assign 是直接覆盖第一层属性，他是不会深入覆盖的。
- 什么意思呢，就是说如果属性值是对象，对象里面包含其他值，他不会再深入一层对比对象里面的值进行覆盖，而是直接将这个对象值给覆盖过去

## 代码
```js
// Object.assign
const source1 = {
  a: 1,
  b: 2,
  data: {
    test: 2
  }
}

const source2 = {
  d: 5,
  b: 1
}

const target = {
  b: 4,
  c: 3,
  data: {
    value: 1,
    array: []
  }
}

const result = Object.assign(target, source1, source2)

console.log(result) // { b: 1, c: 3, data: { test: 2 }, a: 1, d: 5 }
// data 属性被覆盖掉了
console.log(result === target) // true

```
