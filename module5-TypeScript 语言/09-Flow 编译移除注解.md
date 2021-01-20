- Flow 编译移除注解
  - JS 环境中无法直接运行带了类型注解的代码
  - 类型检查只是为了让我们在编码过程中找出问题
  - 在编译过程中可以使用一些工具移除类型注解
  - 工具
    - flow-remove-types
      - 这里官方 npm 包教程是全局安装，但是这种玩意都是跟着项目走，所以
      - npm install flow-remove-types -D
      - 在 package.json 中配置 "scripts": { "build": "flow-remove-types src -d dist" }
        - src -> 资源文件路径；dist -> 打包之后的路径
        - tips：也可以使用 npx flow-remove-types src -d dist 去执行
        - npx 会尝试查找 node_modules/bin 下的可执行文件
        - 如果当前目录没有 node_modules，他会继续向上查找，直到磁盘根目录
      - 然后愉快的执行 npm run build
    - @babel/preset-flow
      - npm install @babel/core @babel/cli @babel/preset-flow -D
      - 创建 .babelrc 文件 添加 "presets": ["@babel/preset-flow"]
      - 在 package.json 中添加 "scripts": { "build:babel": "babel src -d dist" }
      - 然后愉快的执行 npm run build:babel 就可以了

### flow-remove-types 输出结果
![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210118144037.png)

### babel 输出结果
![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210118143908.png)
