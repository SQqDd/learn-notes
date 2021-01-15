# Object.is
## 描述
- 比较两个值是否相等（用得不多）

## 代码
```js
console.log(
  // 0 == false // true
  // 0 === false // false
  // +0 === -0 // true
  // Object.is(+0, -0) // false
  NaN === NaN // false
  // Object.is(NaN, NaN) // true
)

```
