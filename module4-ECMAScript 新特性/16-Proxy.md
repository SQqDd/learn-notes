# Proxy
## 描述
- 给对象设置代理器
- 能监听对象的值读、写
- 比 Object.defineProperty 更强大
- 接收参数，(代理对象, 代理的处理函数)
- 处理函数能设置 get（读）、set（写） 属性
  - get 属性值是一个函数，接收两个参数 (代理对象, 属性名)
  - set 属性值是一个函数，接收两个参数 (代理对象, 属性名, 属性值)

## 代码
```js
const person = {
  name: 'mo',
  age: 24
}

const personProxy = new Proxy(person, {
  get(target, property) {
    console.log(target) // { name: 'mo', age: 24 }
    console.log(property) // name
    return property in target ? target[property] : undefined
  },

  set(target, property, value) {
    console.log(value)
    if (property === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError(`${value} is not a int`)
      }
    }

    target[property] = value
  }
})

console.log(personProxy.name) // 触发 get 函数
personProxy.age = 10.12 // 触发 set 函数

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210113095643.png)
