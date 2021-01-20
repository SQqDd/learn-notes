// 枚举
// const PostStatus = {
//   Draft: 0,
//   UnPublished: 1,
//   Published: 2
// }

// 枚举可以定义一些带名字的常量
// enum PostStatus {
//   Draft = 0,
//   UnPublished = 1,
//   Published = 2
// }

// 数组枚举不赋值的清空下，从 0 开始，自动加 1
enum PostStatus {
  Draft,
  UnPublished,
  Published
}

// const enum PostStatus {
//   Draft,
//   UnPublished,
//   Published
// }

// 从 6 开始自动加 1
// enum PostStatus {
//   Draft = 6,
//   UnPublished, // 7
//   Published // 8
// }

// 字符串枚举就没法自动加 1 了，只能老老实实赋值
// enum StrStatus {
//   Draft = 'str1',
//   UnPublished = 'str2'
// }

const content = {
  title: 'my name is title',
  main: 'my name is main',
  status: PostStatus.Draft // 1 2
}

// 枚举在运行时是真正存在的对象，编译过后是不会被删除的
