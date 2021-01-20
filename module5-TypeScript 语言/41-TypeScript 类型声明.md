- 类型声明
  - 实际开发中，我们都会使用第三方模块；有些模块没有类型声明文件，此时就要我们自己去声明类型了
  - 由于 ts 社区的强大，很多第三方模块都有类型声明文件。一些是本身自带的，一些是要安装的
  - 譬如安装 lodash 类型声明文件 ` npm i --save-dev @types/lodash `
  - 如果都没有的话，只能自己去写了
  - 类型声明文件都是 `.d.ts` 结尾

```ts
import { toUpper } from 'lodash'

declare function toUpper(value: string): string

const res = toUpper('xxxxx')

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210120142854.png)
