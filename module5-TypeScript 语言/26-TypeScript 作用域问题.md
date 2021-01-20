- TypeScript 作用域问题
  - A 文件定义了 foo 变量；B 文件再定义 foo 变量，ts 会提示错误
  - 解决方案：
    - 使用立即执行函数包装
    - ``` export {}  ```  写一行这样的代码，让当前文件变成一个模块，使变量成为局部成员

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210119142413.png)

```ts
// (function () {
//   const a: string = '123'
// })()

const a: string = '123'

export {} // 变成一个模块，确保跟其他文件没有成员冲突


```
