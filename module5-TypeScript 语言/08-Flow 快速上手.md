- Flow 快速上手
  - 安装
    - npm install flow-bin -D
  - 使用
    - package.json 中添加 "scripts": { "flow": "flow" }
    - 执行 npm run flow init 初始化 flow 配置文件
    - 需要检查的文件上方加上 ``` // @flow ```
    - 检查文件 npm run flow

```js
// @flow

function sum(a: number, b: number) {
  return a + b
}

sum(1, 2)
sum('1', '2')

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210118112147.png)
