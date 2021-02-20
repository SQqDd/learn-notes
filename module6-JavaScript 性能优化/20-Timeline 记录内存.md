- Timeline 内存记录
  - 编写下面代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <button id="btn">add</button>

  <script>
    const list = new Array(1000000)

    function test() {
      for (let i = 0; i < 10000; i++) {
        document.body.appendChild(document.createElement('p'))
      }
      list.join('x')
    }

    const btn = document.getElementById('btn')

    btn.addEventListener('click', test)
  </script>
</body>
</html>

```
- 接着打开 Performance 工具，点击录制
- 然后每隔一段时间点击 add 按钮
![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210123112922.png)
- 如果出现内存使用一直上升，就证明有内存泄漏的地方
![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210123143504.png)
