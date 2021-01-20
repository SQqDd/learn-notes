- 枚举类型
  - 使用枚举我们可以定义一些带名字的常量。
  - 使用枚举可以清晰地表达意图或创建一组有区别的用例
  - TypeScript 支持数字和基于字符串的枚举
  - 枚举会影响编译后的结果

```ts
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
// enum PostStatus {
//   Draft,
//   UnPublished,
//   Published
// }

const enum PostStatus {
  Draft,
  UnPublished,
  Published
}

// 从 6 开始自动加 1
// enum PostStatus {
//   Draft = 6,
//   UnPublished, // 7
//   Published // 8
// }

// 字符串枚举就没法自动加 1 了，只能老老实实赋值
enum StrStatus {
  Draft = 'str1',
  UnPublished = 'str2'
}

const content = {
  title: 'my name is title',
  main: 'my name is main',
  status: PostStatus.Draft // 1 2
}

```

- 枚举是在运行时真正存在的对象，不会因为编译过后被删除
- 上面的 PostStatus 枚举编译过后的结果是这样的
```js
var PostStatus;
(function (PostStatus) {
    PostStatus[PostStatus["Draft"] = 0] = "Draft";
    PostStatus[PostStatus["UnPublished"] = 1] = "UnPublished";
    PostStatus[PostStatus["Published"] = 2] = "Published";
})(PostStatus || (PostStatus = {}));

var content = {
    title: 'my name is title',
    main: 'my name is main',
    status: PostStatus.Draft // 1 2
};
```
- 编译之后的枚举对象，他包含了正向映射（name -> value）和反向映射（value -> name）
- 所以在代码中可以这样访问 ``` PostStatus[0] ```  就可以访问到 'Draft'
- 如果不想双向映射，就使用 ``` const ``` 枚举，很简单，在 ``` enum ``` 前面加个 ``` const ``` 就好了
- 使用 const 可以避免额外生成的代码上的开销和额外的非直接的对枚举成员的访问

```ts
const enum PostStatus {
  Draft,
  UnPublished,
  Published
}
```
- 编译后的结果是这样的
```js
var content = {
    title: 'my name is title',
    main: 'my name is main',
    status: 0 /* Draft */ // 1 2
};
```
