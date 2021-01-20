- TypeScript 快速上手
  - npm init - y 初始化文件
  - npm install typescript -D 安装 typescript
  - 在 package.json 中配置 "scripts": { "build": "tsc" }
  - 然后创建一个 .ts 文件，ts 文件的内容可以完全按照 JavaScript 的标准去编写
  - 然后执行 npm run build xxx.ts
  - tsc 编译 .ts 文件生成对应的 .js 文件

### ts 代码
```ts
const hello = (name: string) => {
  console.log(`hello ${name}`)
}

hello('TypeScript')

```

### js 代码
```js
var hello = function (name) {
    console.log("hello " + name);
};
hello('TypeScript');

```

### 分析
- tsc 可以将 ES6 以上的语法编译成最低 ES3 标准的语法（这里可配置），适配各种浏览器
- 编译的时候会将类型注解去除
- 而且 ts 文件不用类型系统，只用 js，也可以编译成可运行的 js 文件
