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
