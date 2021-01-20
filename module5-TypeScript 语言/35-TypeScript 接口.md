- 接口 interface
  - 在 TypeScript中，接口的作用是为了约束对象的结构
  - 编译过后，接口代码全都会被移除掉。
  - 接口只是在编码阶段对有数据结构的对象进行约束；在运行阶段是没有任何意义的
  - 使用关键词 interface 定义接口
    - 接口可以定义可选成员``` ? ```和只读成员``` readonly ```
    - 接口还可以定义动态成员，只需要定义键值对的类型


```ts
// 接口 interface

export = {}

// 接口可以添加可选成员 ?
// 只读成员 readonly
interface Post {
  title: string,
  content: string,
  time: number,
  status: number,
  subTitle?: string,
  readonly summary: string
}

function get(post: Post) {
  console.log(post.title)
  console.log(post.content)
  console.log(post.time)
  console.log(post.status)

  // post.summary = '1123' // 无法修改只读成员 summary
}

// 动态成员
interface Cache {
  // prop 不是固定的，代表 key 的名称
  [prop: string]: string
}

const cache: Cache = {}

cache.foo = 'foo'
cache.bar = 'foo'


```
