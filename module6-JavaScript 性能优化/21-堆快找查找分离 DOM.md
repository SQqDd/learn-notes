- 堆快照查找分离 DOM
  - 什么是分离 DOM
    - DOM 有几个存活状态
      - 显示在页面上的 DOM 节点
      - 垃圾对象时的 DOM 节点（不显示在页面上，且 JS 脚本里没有引用）
      - 分离状态的 DOM 节点（不显示在页面上，但 JS 脚本里有引用）

上代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <button id="btn">Add</button>

  <script>
    var tmpEle

    function fn() {
      const ul = document.createElement('ul')

      for (let i = 0; i < 10; i++) {
        ul.appendChild(document.createElement('li'))
      }

      // 分离 DOM，使用全局变量存储，但不显示在页面上
      tmpEle = ul
    }

    document.getElementById('btn').addEventListener('click', fn)
  </script>

</body>
</html>

```

- 打开浏览器，运行此代码
- 进入开发工具中的 memory
- 选择 Heap snapshot（堆快照）
- 然后点击 Take Snapshot
![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210124155334.png)
![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210124155452.png)

- 如何解决问题？
![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210124155642.png)

```js
tmpEle = ul

tmpEle = null
```
![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210124155751.png)
- 此时再执行堆快照，搜索 `deta` 就没有显示分离的 DOM 节点啦
