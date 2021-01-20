- Flow 原始类型
  - string
  - number
  - boolean
  - null
  - undefined -> flow 用 void 表示
  - symbol

```js
// @flow

const a:string = "123"

const b:number = Infinity // NaN // 100

const c:boolean = true // false

const d:null = null

const e:void = undefined

const f:symbol = Symbol()

```
