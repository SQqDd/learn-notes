// 获取 package.json 文件的 version 内容
const { task } = require('folktale/concurrency/task')
const fs = require('fs')
const { split, find } = require('lodash/fp')

// folktale 中 task 是一个函数，返回一个 task 函子
function readFile(filename) {
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) {
        resolver.reject(err)
      }

      resolver.resolve(data)
    })
  })
}

readFile('package.json')
  .map(split('\n')) // 调用函子 map 方法，传入处理函数
  .map(find(x => x.includes('version')))
  .run() // 执行 task 函子
  .listen({
    onRejected: err => {

    },
    onResolved: value => { // 执行成功后，将结果返回给 onResolved 函数
      console.log(value) // "version": "1.0.0",
    }
  })
