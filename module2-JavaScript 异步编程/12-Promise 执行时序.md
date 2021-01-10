# Promise 执行时序
## 代码
```js
// 宏任务/微任务
console.log('start')

setTimeout(() => console.log('setTimeout'), 0)

Promise.resolve(1)
  .then(value => {
    console.log('Promise1')
  })
  .then(value => {
    console.log('Promise2')
  })
  .then(value => {
    console.log('Promise3')
  })
  .then(value => {
    console.log('Promise4')
  })

console.log('end')

```

![](https://dd-ss.oss-cn-guangzhou.aliyuncs.com/20210106145835.png)

## 分析
- 上面代码的执行顺序如图所示，然而并不是我们想象的 start -> setTimeout -> Promise1 -> Promise2 -> Promise3 -> Promise4 -> end
- 为什么呢？
- 这就要扯处两给词了，宏任务和微任务
- 在消息队列中，任务有两种类型，一种是宏任务，一种是微任务
- 大部分异步任务都是宏任务，而 Promise 的回调、MutationObserver 和 node 里面的 process.nextTick 都是微任务
- 接下来要说如何执行了
- 当第一次加载代码的时候，这套代码形成了一个宏任务，依次执行，当遇到 setTimeout 这类的异步任务，就会形成一个宏任务放到消息队列
- 遇到 Promise 的回调就会形成微任务，在当前宏任务执行完过后马上执行该微任务
- 当前宏任务里的微任务是在当前宏任务执行完之后就马上执行
- 而在宏任务里创建的宏任务会在当前宏任务和微任务执行完之后就执行
- 所以执行顺序是以下这样的
- 宏任务 A -> 微任务 A -> 宏任务 B -> 微任务 B ......
- 微任务的好处能够带更好的程序响应，vue 的视图更新就是采用微任务的方式
