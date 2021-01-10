# Promise 概述
## 概念
- Promise（承诺） 是一种异步编程解决方案，可以解决回调地狱的问题
- Promise 内部有三个状态，pending（等待）、fulfilled（实现了）、rejected（拒绝了）
- 当 fulfilled 的时候就调用 onFulfilled 回调函数，rejected 的时候调用 onRejected 回调函数
- 譬如我们有一个 ajax 请求，使用 Promise 承诺，请求过程中，状态是 pending，当 ajax 成功返回的时候，状态就变成 fulfilled，然后执行 onFulfilled 函数；当请求失败的时候，状态就变成 rejected，然后执行 onRejected 函数
- Promise 状态不能从 rejected 改变成 fulfilled，反之亦然。当变成这两种状态的时候，Promise 已经结束了。要想改变，也只能新起一个 Promise（承诺）
