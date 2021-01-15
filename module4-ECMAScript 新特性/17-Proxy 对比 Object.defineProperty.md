# Proxy 对比 Object.defineProperty
## 区别
- Object.defineProperty 只能监听对象属性的读、写；而 Proxy 可以监听对象的许多操作
- Proxy 更好的支持监听数组对象。Object.defineProperty 监听数组只能重写 Array.prototype.push 等一些操作数组的方法
- Proxy 以非侵入的方式监管了对象的读写（不需要做很多额外的操作，Object.defineProperty 需要写大量的代码去实现监听）

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210113100312.png)

## 代码 1
```js
const list = []

const listProxy = new Proxy(list, {
  set(target, property, value) {
    // property 在数组中指下标
    console.log(target, property, value)
    target[property] = value
    console.log('写入成功')
    return true
  }
})

listProxy.push(100)

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210113101746.png)

## 代码 2
